using FinalProject.Models;

namespace FinalProject.DTO
{
    public class MealDto
    {
        
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Details { get; set; }
        public string? Photo { get; set; }
        //public IFormFile? Photo { get; set; }
        public decimal Discount { get; set; }
        public int CategoryId { get; set; }
       
        
    }
}
