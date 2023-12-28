namespace FinalProject.Models
{
    public class Extra
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        //relations
        //extra
        public string? Photo { get; set; }
        public virtual ICollection<OrderExtra>? OrderExtras { get; set; }


    }
}
