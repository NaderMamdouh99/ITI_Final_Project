namespace FinalProject.Models
{
    public class Meal
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Details { get; set; }
        //public byte[]? Photo { get; set; }
        public string? Photo { get; set; }
        public decimal Discount { get; set; }
        //relations
        public int CategoryId { get; set; }
        public Category? Category { get; set; }
        public virtual ICollection<OrderMeal>? OrderMeals { get; set; }

    }
}
