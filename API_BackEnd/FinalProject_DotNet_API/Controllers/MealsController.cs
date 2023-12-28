using FinalProject.Data;
using FinalProject.DTO;
using FinalProject.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IHostingEnvironment = Microsoft.AspNetCore.Hosting.IHostingEnvironment;

namespace FinalProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MealsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        [Obsolete]
        private readonly IHostingEnvironment _host;

        [Obsolete]
        public MealsController(ApplicationDbContext context, IHostingEnvironment host)
        {
            _context = context;
            _host = host;
        }
        [HttpGet("getAll")]
        public IActionResult GetAll()
        {
            var meals = _context.Meals.ToList();
            return Ok(meals);
        }
        [HttpGet("getById/{id}")]
        //[Obsolete]
        public async Task<IActionResult> GetById(int id)
        {
            //TODO:: validate=> photo name do not repeat
            var meal = await _context.Meals.FindAsync(id);
           


            return Ok(meal);
        }

        [HttpPost("create")]

        public async Task<IActionResult> Create( MealDto mealDto)
        {

            var newobj = new Meal
            {
                
                Name = mealDto.Name,
                CategoryId = mealDto.CategoryId,
                Details = mealDto.Details,
                Discount = mealDto.Discount,
                Photo = mealDto.Photo,
                Price = mealDto.Price
            
            };

            await _context.Meals.AddAsync(newobj);
            await _context.SaveChangesAsync();
            return Ok(newobj);
        }

    





        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] MealDto mealDto)
        {
            var meal = await _context.Meals.SingleOrDefaultAsync(g => g.Id == id);
            if (meal == null)
            {
                return NotFound("this meal is not existed");
            }
            meal.Name = mealDto.Name;
            meal.Discount = mealDto.Discount;
            meal.Details = mealDto.Details;
            meal.Price = mealDto.Price;
            meal.CategoryId = mealDto.CategoryId;
            meal.Photo = mealDto.Photo;

            _context.SaveChanges();

            return Ok(meal);

        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var meal = await _context.Meals.SingleOrDefaultAsync(g => g.Id == id);
            if (meal == null)
            {
                return NotFound("this meal is not existed");
            }
            _context.Meals.Remove(meal);
            _context.SaveChanges();
            return Ok(meal);
        }


        
    }

    
}
