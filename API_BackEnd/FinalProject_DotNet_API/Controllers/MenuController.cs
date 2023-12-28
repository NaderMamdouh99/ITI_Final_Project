using FinalProject.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FinalProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuController : ControllerBase
    {

        Data.ApplicationDbContext context ;

        public MenuController(Data.ApplicationDbContext _context)
        {
            context = _context;

        }

        [HttpGet]
        public IActionResult GetAll()
        {
            List<Menu> menus = context.Menus.Include(c => c.Categories).ToList();
            return Ok(menus);
        }

        [HttpPost("create")]
        public IActionResult Add([FromBody] Menu menu)
        {
            if (ModelState.IsValid)
            {
                context.Menus.Add(menu);
                context.SaveChanges();
                //return Ok();
                return Created("https://localhost:7088/api/Menu/" + menu.Id, menu);

            }
            return BadRequest("menu is not valid");
        }
        [HttpPut]
        public IActionResult update(Menu menu)
        {
            if (ModelState.IsValid)
            {
                context.Menus.Update(menu);
                context.SaveChanges();
                return StatusCode(204, new { Message = "Menu modified" });


            }
            return BadRequest();
        }
        [HttpDelete]
        public IActionResult Delete(int id)
        {
            Menu menu = context.Menus.Find(id);
            if (menu != null)
            {
                context.Menus.Remove(menu);
                context.SaveChanges();
                return Ok(new { Message = $"{menu.Id} Removed!" });
            }
            return BadRequest();
        }
    }
}
