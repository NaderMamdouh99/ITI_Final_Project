using System.Reflection.Metadata.Ecma335;

namespace FinalProject.Models
{
    public class Customer:Person
    {
        public virtual ICollection<Comment>? Comments { get; set; }

        public virtual ICollection<Order>? Orders { get; set; }
    }
}
