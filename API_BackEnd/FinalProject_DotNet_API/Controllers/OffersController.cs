using FinalProject.Data;
using FinalProject.DTO;
using FinalProject.Migrations;
using FinalProject.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace FinalProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OffersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
  
        public OffersController(ApplicationDbContext context)
        {
            _context = context;
           
        }
        [HttpGet]
        public IActionResult GetAll()
        {
            var offers = _context.Offers.ToList();
            return Ok(offers);
        }

        [HttpGet("{id:int}")]
       
        public async Task<IActionResult> GetById(int id)
        {
            var offer = await _context.Offers.FindAsync(id);   
            return Ok(offer);
        }

        [HttpPost]

        public async Task<IActionResult> Create([FromBody] Offer offerdata)
        {
          
           await _context.Offers.AddAsync(offerdata);
            _context.SaveChanges();
            return Ok(offerdata);
        }
      


        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Offer mealDto)
        {
            var offer = await _context.Offers.SingleOrDefaultAsync(g => g.Id == id);
            if (offer == null)
            {
                return NotFound("this meal is not existed");
            }
            offer.Name = mealDto.Name;
            offer.enddate = mealDto.enddate;
            offer.Details = mealDto.Details;
            offer.Price = mealDto.Price;
            offer.startdate = mealDto.enddate;
            offer.Photo = mealDto.Photo;

            _context.SaveChanges();

            return Ok(offer);

        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var offer = await _context.Offers.SingleOrDefaultAsync(g => g.Id == id);
            if (offer == null)
            {
                return NotFound("this meal is not existed");
            }
            _context.Offers.Remove(offer);
            _context.SaveChanges();
            return Ok(offer);
        }


       


    }
}
