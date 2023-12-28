namespace FinalProject.Models
{
    public class Menu
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }

       
        public virtual ICollection<Category>? Categories { get; set; }
    }
}
