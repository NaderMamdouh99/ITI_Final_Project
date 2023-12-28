namespace FinalProject.Models
{
    public class Cashier:Person
    {
        public virtual ICollection<Order>? Orders { get; set; }
    }
}
