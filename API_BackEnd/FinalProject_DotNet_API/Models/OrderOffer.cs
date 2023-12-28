namespace FinalProject.Models
{
    public class OrderOffer
    {

        public int OrderOfferId { get; set; }
        public int OrderId { get; set; }
        public virtual Order? Order { get; set; }
        public int OfferId { get; set; }
        public virtual Offer? Offer { get; set; }

        public int Amount { get; set; }
        public decimal TotalPrice { get; set; }


    }
}
