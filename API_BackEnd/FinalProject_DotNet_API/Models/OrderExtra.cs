namespace FinalProject.Models
{
    public class OrderExtra
    {
        public int OrderExtraId { get; set; }
        public int OrderId { get; set; }
        public virtual Order? Order { get; set; }
        public int ExtraId { get; set; }
        public virtual Extra? Extra { get; set; }

        public int Amount { get; set; }
        public decimal TotalPrice { get; set; }
    }
}
