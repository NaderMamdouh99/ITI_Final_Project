namespace FinalProject.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Details { get; set; }
        public int CustomerId { get; set; }
        public virtual Customer? Customer { get; set; }
    }
}
