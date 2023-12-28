namespace FinalProject.Models
{
    public class Offer
    {
   
        public int Id { get; set; }
        public string Name { get; set; }
        public string Details { get; set; }
        public decimal Price { get; set; }
        public string? Photo { get; set; }
        public DateTime startdate { get; set; }
        public DateTime enddate { get; set; }
        public virtual ICollection<OrderOffer>? OrderOffers { get; set; }

    }
}
