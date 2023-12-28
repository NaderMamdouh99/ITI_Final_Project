using FinalProject.Data;
using FinalProject.DTO;
using FinalProject.Helpers;
using FinalProject.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using static FinalProject.DTO.OrderDto;

namespace FinalProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<RegistrationUser> _userManager;
        public OrdersController(ApplicationDbContext context, UserManager<RegistrationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
            _userManager = userManager;
        }

        [HttpPost]
        public async Task< IActionResult> Create([FromBody] OrderDto orderDto)
        {
                var customerid = _context.Customers.FirstOrDefault((data) => data.Email == orderDto.CustumerEmail).Id;
            
            if ((orderDto.Mealord is not null || orderDto.Offerord is not null)&&customerid != null )
            {


                #region create order 
                
                    var order = new Order
                    {
                        CashierId = 2,
                        DeliveryBoyId = 1,
                        CustomerId = customerid,
                        DeliveryTime = DateTime.Now,
                        OrderDate = DateTime.Now,
                        OrderPrice = 0,
                        Status = Status.pending

                    };
                    await _context.Orders.AddAsync(order);
                    _context.SaveChanges();
                
                #endregion
                decimal meal = 0;
                if (orderDto.Mealord is not null && orderDto.Mealord[0].mealId!=-1)
                {
                    foreach (var item in orderDto.Mealord)
                    {
                        decimal price = 0;
                        if (_context.Meals.Find(item.mealId).Discount > 0)
                        {
                            price = _context.Meals.Find(item.mealId).Discount;
                        }
                        else
                        {
                            price = _context.Meals.Find(item.mealId).Price;

                        }
                        var orderMeal = new OrderMeal
                        {
                            OrderId = order.Id,
                            MealId = item.mealId,
                            Amount = item.quantity,
                            TotalPrice = price * item.quantity
                        };
                        meal += orderMeal.TotalPrice;
                        _context.OrderMeals.Add(orderMeal);
                    }
                }

                decimal offer = 0;
                if (orderDto.Offerord is not null && orderDto.Offerord[0].offerId != -1)
                {
                    foreach (var item in orderDto.Offerord)
                    {
                        decimal price = 0;

                        price = _context.Offers.Find(item.offerId).Price;


                        var orderOffer = new OrderOffer
                        {
                            OrderId = order.Id,
                            OfferId = item.offerId,
                            Amount = item.quantity,
                            TotalPrice = price * item.quantity
                        };
                        offer += orderOffer.TotalPrice;
                        _context.OrderOffers.Add(orderOffer);
                    }
                }
                decimal extr = 0;
                if (orderDto.Extraord is not null && orderDto.Extraord[0].id != -1)
                {
                    foreach (var item in orderDto.Extraord)
                    {
                        decimal price = 0;

                        price = _context.Extras.Find(item.id).Price;


                        var orderOffer = new OrderExtra
                        {
                            OrderId = order.Id,
                            ExtraId = item.id,
                            Amount = item.amount,
                            TotalPrice = price * item.amount
                        };
                        extr += orderOffer.TotalPrice;
                        _context.OrderExtras.Add(orderOffer);
                    }
                }
                order.OrderPrice = offer + extr + meal;


                _context.SaveChanges();
            }

            return Ok(orderDto);
        }




        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateOrderStatus(int orderId, string status)
        {
            var oldstatus = _context.Orders.Find(orderId);
          
            if (oldstatus == null)
            {
                return BadRequest("this order not existed");
            }

            if(status== "accepted")
              oldstatus.Status = Status.accepted;
            else if (status == "regjected")
                oldstatus.Status = Status.regjected;
            else if (status == "complete")
                oldstatus.Status = Status.pending;
            else 
                oldstatus.Status = Status.complete;

            await _context.SaveChangesAsync();
            return Ok(oldstatus);
        }
        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {

            var orders = await _context.Orders.ToListAsync();

            return Ok(orders);
        }
        [HttpGet("GetOrderDetail/{orderId:int}")]
        public async Task<IActionResult> GetOrderDetail(int orderId)
        {
            var orderMeal = await _context.OrderMeals.Where(e => e.OrderId == orderId).ToListAsync();
            var orderExtra = await _context.OrderExtras.Where(e => e.OrderId == orderId).ToListAsync();
            var orderOffer = await _context.OrderOffers.Where(e => e.OrderId == orderId).ToListAsync();

            var bigOder = _context.Orders.Find(orderId);
            if (bigOder == null)
            {
                BadRequest("this order is not existed");
            }
            var orderdto = new OrderDto();

            int i = 0;
            if (orderMeal != null)
            {
                orderdto.Mealord = orderMeal.Select(order =>
                  new Meals
                  {
                      quantity = order.Amount,
                      mealId = order.MealId
                  }).ToArray();
            }
            _context.SaveChanges();
            if (orderOffer != null)
            {
                //
                int j = 0;
                orderdto.Offerord = orderOffer.Select(order =>
                        new Offers
                        {
                            quantity = order.Amount,
                            offerId = order.OfferId
                        }).ToArray();

            }
            _context.SaveChanges();

            if (orderExtra != null)
            {
                int k = 0;
                orderdto.Extraord = orderExtra.Select(order =>
               new Extras
               {
                   amount = order.Amount,
                   id = order.ExtraId
               }).ToArray();

            }

            var customerId = _context.Orders.Find(orderId)?.CustomerId;
            orderdto.CustumerEmail = _context.Customers.Find(customerId)?.Email;

            _context.SaveChanges();
            return Ok(orderdto);

        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            return Ok(order);
        }

        //status
        [HttpPut("UpdateOrderStatus/{orderId}")]
        public IActionResult UpdateOrderStatus(int orderId, [FromBody] int status)
        {
            // Get the order from the database
            var order = _context.Orders.Find(orderId);

            if (order == null)
            {
                return NotFound("Order not found");
            }

            // Update the status
            order.Status = (Status)status;
            
      


            // Save changes to the database
            _context.SaveChanges();

            return Ok(order);
        }

        //delivery boy
        [HttpGet("GetAllDeliveryBoy")]
        public async Task<IActionResult> GetAllDeliveryBoy()
        {

            var deliveryboy = await _context.DeliveryBoys.ToListAsync();

            return Ok(deliveryboy);
        }

        [HttpPut("UpdateDeliveryBoy/{oderId}")]
        public async Task<IActionResult> UpdateDeliveryBoy(int oderId, [FromBody] int deliveryId)
        {
            var order = _context.Orders.Find(oderId);

            if (order == null)
            {
                return BadRequest("Order not found");
            }

            order.DeliveryBoyId = deliveryId;

            await _context.SaveChangesAsync();

            return Ok(order);
        }

        ///cashier
        [HttpGet("GetAllCashier")]
        public async Task<IActionResult> GetAllCashier()
        {

            var cashiers = await _context.Cashiers.ToListAsync();

            return Ok(cashiers);
        }

        [HttpPut("UpdateCashier/{oderId}")]
        public async Task<IActionResult> UpdateCashier(int oderId, [FromBody] int cashierId)
        {
            var order = _context.Orders.Find(oderId);

            if (order == null)
            {
                return BadRequest("Order not found");
            }

            order.CashierId = cashierId;

            await _context.SaveChangesAsync();

            return Ok(order);
        }

    }
}