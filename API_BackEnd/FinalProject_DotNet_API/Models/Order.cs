using FinalProject.Helpers;

namespace FinalProject.Models
{
    public class Order
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; }
        public DateTime DeliveryTime { get; set; }
        public decimal OrderPrice { get; set; }
        public Status Status { get; set; } = Status.pending;    

        //relations
        public int CustomerId { get; set; }
        public virtual Customer? Customer { get; set; }
        public int CashierId { get; set; }
        public Cashier? Cashier { get; set; }
        public int DeliveryBoyId { get; set; }
        public DeliveryBoy? DeliveryBoy  { get; set; }
        public virtual ICollection<OrderMeal>? OrderMeals { get; set; }
        public virtual ICollection<OrderOffer>? OrderOffers { get; set; }
        public virtual ICollection<OrderExtra>? OrderExtras { get; set; }



    }


}
