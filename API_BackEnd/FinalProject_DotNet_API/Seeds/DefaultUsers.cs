using FinalProject.Models;
using Microsoft.AspNetCore.Identity;

namespace FinalProject.Seeds
{
    public static class DefaultUsers
    {
        public static async Task SeedAdminUserAsync(UserManager<RegistrationUser> userManager)
        {
            RegistrationUser admin = new()
            {
                UserName = "admin",
                Email = "admin@gmail.com",
                EmailConfirmed = true
            };

            var user = await userManager.FindByNameAsync(admin.UserName);

            if (user is null)
            {
                await userManager.CreateAsync(admin, "Admin@123");
                await userManager.AddToRoleAsync(admin, AppRoles.Admin);
            }
        }
    }
}