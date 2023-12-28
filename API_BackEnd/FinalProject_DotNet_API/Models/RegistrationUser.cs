using Microsoft.AspNetCore.Identity;

namespace FinalProject.Models
{
    public class RegistrationUser:IdentityUser
    {
        public string? Address { get; set; }
    }
}
