//using Microsoft.AspNetCore.Identity;
//using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
//using Microsoft.EntityFrameworkCore;


using FinalProject.Models;
using Microsoft.AspNetCore.Identity;//
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
 

namespace FinalProject.Data
{
    public class ApplicationDbContext : IdentityDbContext<RegistrationUser, IdentityRole, string>
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {


        }

        #region DbSet
        public virtual DbSet<Cashier> Cashiers { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Comment> Comments { get; set; }
        public virtual DbSet<Customer> Customers { get; set; }
        public virtual DbSet<DeliveryBoy> DeliveryBoys { get; set; }
        public virtual DbSet<Extra> Extras { get; set; }
        public virtual DbSet<Meal> Meals { get; set; }
        public virtual DbSet<Menu> Menus { get; set; }
        public virtual DbSet<Offer> Offers { get; set; }
        public virtual DbSet<OrderMeal> OrderMeals { get; set; }
        public virtual DbSet<OrderOffer> OrderOffers { get; set; }
        public virtual DbSet<OrderExtra> OrderExtras { get; set; }


        public virtual DbSet<Order> Orders { get; set; }
        #endregion

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            //// Seed Identity roles using Fluent API
            //builder.Entity<IdentityRole>().HasData(
            //    new IdentityRole { Id = "1", Name = "admin", NormalizedName = "ADMIN" },
            //    new IdentityRole { Id = "2", Name = "user", NormalizedName = "USER" },
            //    new IdentityRole { Id = "3", Name = "cashier", NormalizedName = "CASHIER" },
            //    new IdentityRole { Id = "4", Name = "delivery", NormalizedName = "DELIVERY" }

            //// Add more roles as needed
            //);
        }

    }

    }
