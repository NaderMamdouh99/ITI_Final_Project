namespace FinalProject.Models
{
    public class DeliveryBoy:Person
    {
        public virtual ICollection<Order>? Orders { get; set; }

    }
}
