namespace FinalProject.Models
{
    public class OrderMeal
    {
        public int OrderMealId { get; set; }
        public int OrderId { get; set; }
        public virtual Order? Order { get; set; }
        public int MealId { get; set; }
        public virtual Meal? Meal { get; set;}

        public int Amount { get; set; }
        public decimal TotalPrice { get; set; }

    }

 




}
