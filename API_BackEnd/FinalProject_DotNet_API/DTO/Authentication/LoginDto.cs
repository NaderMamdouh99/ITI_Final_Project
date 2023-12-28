using System.ComponentModel.DataAnnotations;

namespace FinalProject.DTO.Authentication
{
    public class LoginDto
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }

    }
}
