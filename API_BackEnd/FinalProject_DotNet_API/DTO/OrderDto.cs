namespace FinalProject.DTO
{
    public class OrderDto
    {
        
        public string? CustumerEmail { get; set; }
        public Meals[]? Mealord { get; set; }
        public Offers[]? Offerord { get; set; }
        public Extras[]? Extraord { get; set; }




        public class Meals
        {
            public int mealId { get; set; }
            public int quantity { get; set; }
        }
        public class Offers
        {
            public int offerId { get; set;}
            public int quantity { get; set;}
        }
        public class Extras
        {
            public int id { get; set; }
            public int amount { get; set; }
        }

    }

  
}
