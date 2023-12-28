namespace FinalProject.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
            
        public int MenuId { get; set; }
        public virtual Menu? Menu { get; set; }
        public virtual ICollection<Meal>? Meals { get; set; }
    }
}
