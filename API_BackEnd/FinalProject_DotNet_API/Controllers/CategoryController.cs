using FinalProject.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FinalProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        Data.ApplicationDbContext context;
        public CategoryController(Data.ApplicationDbContext _context)
        {
            context = _context;

        }

        [HttpGet]
        public IActionResult GetAll()
        {
            List<Category> categories = context.Categories.ToList();
            return Ok(categories);
        }

        [HttpPost("create")]
        public IActionResult Add([FromBody] Category category)
        {
            if (ModelState.IsValid)
            {
                context.Categories.Add(category);
                context.SaveChanges();
                //return Ok();
                return Created("https://localhost:7088/api/Category/" + category.Id, category);

            }
            return BadRequest("category is not valid");
        }
        [HttpPut]
        public IActionResult update(Category category)
        {
            if (ModelState.IsValid)
            {
                context.Categories.Update(category);
                context.SaveChanges();
                return StatusCode(204, new { Message = "Category modified" });


            }
            return BadRequest();
        }
        [HttpDelete]
        public IActionResult Delete(int id)
        {
            Category category = context.Categories.Find(id);
            if (category != null)
            {
                context.Categories.Remove(category);
                context.SaveChanges();
                return Ok(new { Message = $"{category.Id} Removed!" });
            }
            return BadRequest();
        }
    }
}
