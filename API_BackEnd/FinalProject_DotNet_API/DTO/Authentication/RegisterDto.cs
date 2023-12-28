using System.ComponentModel.DataAnnotations;

namespace FinalProject.DTO.Authentication
{
    public class RegisterDto
    {

        [Required]
        public string userName { get; set; }
        [Required]
        public string role { get; set; }
        [Required]
        public int id { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string? mobile { get; set; }
        [Required]
        public string Password { get; set; }
        public string? Address { get; set; }
      


    }
}
