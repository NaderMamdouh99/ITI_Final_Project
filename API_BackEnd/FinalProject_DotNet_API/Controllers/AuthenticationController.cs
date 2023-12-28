using FinalProject.Data;
using FinalProject.DTO;
using FinalProject.DTO.Authentication;
using FinalProject.Migrations;
using FinalProject.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Reflection;
using System.Security.Claims;
using System.Text;
using static FinalProject.DTO.OrderDto;

namespace FinalProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {

        private readonly ApplicationDbContext _context;
        private readonly UserManager<RegistrationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        //private readonly SignOutResult _signOutResult;  
        private readonly IConfiguration _configuration;
        SignInManager<RegistrationUser> _signInManager;

        public AuthenticationController(ApplicationDbContext context, UserManager<RegistrationUser> userManager, SignInManager<RegistrationUser> signInManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration)
        {
            _context = context;
            _userManager = userManager;
            _roleManager = roleManager;
           
            _signInManager = signInManager;
            _configuration = configuration;

        }
        //TODO:: logout
        [HttpGet]
        


        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> RegisterAsync(RegisterDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("bad error ");
            }

            //TODO:: create admin Role
            if (await _userManager.FindByEmailAsync(model.Email) is not null)
                return BadRequest("Email is already registered!");
            // return new AuthResponseModel { Message = "Email is already registered!" };

            if (await _userManager.FindByNameAsync(model.userName) is not null)
                return BadRequest("Username is already registered!");


            var user = new RegistrationUser
            {
                UserName = model.userName,
                Email = model.Email,
                PhoneNumber = model.mobile,
                PhoneNumberConfirmed = true,
                Address=model.Address,
                 EmailConfirmed = true
            };

            
            var result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                var errors = new StringBuilder();
                foreach (var error in result.Errors)
                    errors.Append($"{error.Description},");
                return BadRequest(errors.ToString());
            }

            await _userManager.AddToRoleAsync(user, model.role);
            
            var jwtSecurityToken = await CreateJwtToken(user);
            //save token in database
            await _userManager.SetAuthenticationTokenAsync(user, "provider", "token", new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken));
            if (model.role == "user")
            {
                var customer = new Customer
                {
                    Email = model.Email,
                    Name = model.userName,
                    Address = model.Address,
                    Phone = model.mobile
                };
                _context.Customers.AddAsync(customer);
                _context.SaveChanges();
            }
            else if (model.role == "cashier")
            {
                var cashier = new Cashier
                {
                    Email = model.Email,
                    Name = model.userName,
                    Address = model.Address,
                    Phone = model.mobile
                };
                _context.Cashiers.AddAsync(cashier);
                _context.SaveChanges();
            }
            else if (model.role == "delivery")
            {
                var delivery = new DeliveryBoy
                {
                    Email = model.Email,
                    Name = model.userName,
                    Address = model.Address,
                    Phone = model.mobile
                };
                _context.DeliveryBoys.AddAsync(delivery);
                _context.SaveChanges();
            }


            return Ok(new
            {
                email = user.Email,
                ExpiresOn = jwtSecurityToken.ValidTo,
                IsAuthenticated = true,
                Roles = new List<string> { model.role },
                Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken),
                Username = user.UserName
            });
        }


        

        [HttpPost("login")]
        
        public async Task<IActionResult> LoginAsync(LoginDto model)
        {


            var user = await _userManager.FindByEmailAsync(model.Email);

            if (user is null || !await _userManager.CheckPasswordAsync(user, model.Password))
            {
                return Ok("Email or Password is incorrect!");
            }

            
            var rolesList = await _userManager.GetRolesAsync(user);
           

           string roleid= rolesList.First();

            return Ok(new
            {
                id=0,
                password=0,
                email = user.Email,
                userName = user.UserName,
                mobile = user.PhoneNumber,
               address=user.Address,
                role = roleid,

            });

        }


        [HttpGet("getuser/{email}")]

        public async Task<IActionResult> getbyemail(string email)
        {

            var user = await _userManager.FindByEmailAsync(email);

            var rolesList = await _userManager.GetRolesAsync(user);
            if (user is  null)
            {
                return BadRequest("not exist");
            }


            string rolename = rolesList.First();

            return Ok(new
            {
                id = 0,
                password = 0,
                email = user.Email,
                userName = user.UserName,
                mobile = user.PhoneNumber,
                address = user.Address,
                role = rolename

            }
                );

        }



            private async Task<JwtSecurityToken> CreateJwtToken(RegistrationUser user)
        {
            var userClaims = await _userManager.GetClaimsAsync(user);
            var userRoles = await _userManager.GetRolesAsync(user);

            var roleClaims = userRoles.Select(r => new Claim("roles", r)).ToList();

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim("uid", user.Id)
            }
            .Union(userClaims)
            .Union(roleClaims);

            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Key"]!));
            var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);

            var jwtSecurityToken = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                claims: claims,
                expires: DateTime.Now.AddDays(int.Parse(_configuration["JWT:DurationInDays"]!)),
                signingCredentials: signingCredentials);

            return jwtSecurityToken;
        }
        [HttpGet("DeleteUser/{id}")]


        public async Task<IActionResult> DeleteUserAsync(string id)
        {
            var result = await _context.Users.Where(x => x.Id == id).FirstOrDefaultAsync();
            if (result != null)
            {
                _context.Users.Remove(result);
                return Ok("deleted");

            }
            return BadRequest("not existed");
        }
        [HttpGet("GetUserById/{id}")]

        public async Task<IActionResult> GetUserByIdAsync(string id)
        {
            var user = await _context.Users.Where(x => x.Id == id).FirstOrDefaultAsync();
            if (user != null)
            { return Ok(user); }
            return BadRequest("this user does not existed!");
        }
        [HttpGet("GetAllUsers")]
        public async Task<IActionResult> GetAllUsersAsync()
        {
            List<RegisterDto> alluser= new List<RegisterDto>();
           
            var users = await _context.Users.ToListAsync();
           
            foreach (var item in users)
            {

                var rolename =await _userManager.GetRolesAsync(item);
               
                    var user = new RegisterDto
                    {
                        id = 0,
                        Password = "0",
                        Email = item.Email,
                        userName = item.UserName,
                        mobile = item.PhoneNumber,
                        Address = item.Address,
                        role = rolename.First()
                    };

                    alluser.Add(user);


            }
          
            return Ok(alluser);
        }







        [Authorize] // Make sure the user is authenticated
        [HttpPost("logout")]
        public async Task<IActionResult> LogoutAsync()
        {
            //_signInManager.IsSignedIn(User);

            //var isAuth = User.Identity.IsAuthenticated;
            //var s = User.Identity.Name;
            var isAuth = User.Identity?.IsAuthenticated;
            if (isAuth == true)
            {
                await _signInManager.SignOutAsync(); //do not work

            }

            //  await _userManager. 
            return Ok("Logout successful");
        }
        [Authorize]
        [HttpGet("test")]
        public async Task<IActionResult> testing(LoginDto model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user is null || !await _userManager.CheckPasswordAsync(user, model.Password))
            {

                return Ok("Email or Password is incorrect!");
            }
            var IsSigned = _signInManager.IsSignedIn(User);
            //_signInManager.SignInAsync(User,)
            var isAuth = User.Identity?.IsAuthenticated;
            var NameUser = User.Identity?.Name;

            return Ok(new
            {
                IsSignedUser = IsSigned,
                isAuthUser = isAuth,
                NameUser2 = NameUser
            });


        }

        [HttpPost]
        [Route("EditUserByEmail")]
        public async Task<IActionResult> EditUserByEmail(RegisterDto model, string OldPassword)
        {
            var userdb = await _userManager.FindByEmailAsync(model.Email);

            if (userdb == null)
            {
                return BadRequest("Email is not existed!");
            }

            // Update user properties
            await _userManager.SetUserNameAsync(userdb, model.userName);
            await _userManager.SetPhoneNumberAsync(userdb, model.mobile);
            userdb.Address = model.Address;



            // Update password if provided
            if (!string.IsNullOrEmpty(model.Password))
            {
                var changePasswordResult = await _userManager.ChangePasswordAsync(userdb, OldPassword, model.Password);
                if (!changePasswordResult.Succeeded)
                {
                    // Handle password change failure
                    return BadRequest("Failed to change password.");
                }
            }

            // Save changes
            var updateResult = await _userManager.UpdateAsync(userdb);

            if (!updateResult.Succeeded)
            {
                // Handle update failure
                var errors = string.Join(", ", updateResult.Errors.Select(e => e.Description));
                return BadRequest($"Failed to update user: {errors}");
            }

            return Ok(userdb);
        }

        [HttpPost("AddToRole")]
        public async Task<IActionResult> AddRoleToUser(string email, string roleName)
        {
            var user = await _userManager.FindByEmailAsync(email);


            if (user == null)
            {
                return NotFound("User not found");
            }

            var result = await _userManager.AddToRoleAsync(user, roleName);

            if (result.Succeeded)
            {
                return Ok($"Role '{roleName}' added to user '{user.UserName}' successfully.");
            }
            else
            {
                return BadRequest($"Failed to add role to user: {string.Join(", ", result.Errors)}");
            }
        }





    }
}