using FinalProject.Data;
using FinalProject.DTO;
using FinalProject.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FinalProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExtraController : ControllerBase
    {
        private readonly ApplicationDbContext context;

        public ExtraController(ApplicationDbContext context)
        {
            this.context = context;
        }

        // GetALL
        [HttpGet]
        public IActionResult GetALL()
        {
            ICollection<Extra> extras = context.Extras.ToList();
            return Ok(extras);
        }

        // GetById
        [HttpGet("{Id:int}", Name = "OneExtraRoute")]
        public IActionResult GetById(int Id)
        {
            Extra? extra = context.Extras.FirstOrDefault(E => E.Id == Id);
            ExtraDTO extraDTO = new ExtraDTO();
            extraDTO.Id = extra.Id;
            extraDTO.Name = extra.Name;
            extraDTO.Price = extra.Price;
            extraDTO.Photo = extra.Photo;
            return Ok(extraDTO);
        }

        //AddExtra
        [HttpPost]
        public IActionResult AddExtra(Extra extra)
        {
            if (ModelState.IsValid == true)
            {

                context.Extras.Add(extra);
                context.SaveChanges();
                return Ok();
            }
            return BadRequest(ModelState);
        }

        //UpdateExtra 
        [HttpPut("{Id:int}")]
        public IActionResult UpdateExtra(int Id, Extra extra)
        {
            Extra? OldExtra = context.Extras.FirstOrDefault(E => E.Id == Id);
            if (ModelState.IsValid == true)
            {
                if (OldExtra != null)
                {
                    OldExtra.Name = extra.Name;
                    OldExtra.Price = extra.Price;
                    OldExtra.Photo = extra.Photo;
                    context.SaveChanges();
                    return Ok(OldExtra);
                }
                return BadRequest("Not Found Extra");
            }
            return BadRequest(ModelState);
        }


        //Delete Extra
        [HttpDelete("{Id:int}")]
        public async Task<IActionResult> Delete(int Id)
        {
            Extra? extra = await context.Extras.FindAsync(Id);
            if (extra != null)
            {
                try
                {
                    context.Extras.Remove(extra);
                    await context.SaveChangesAsync();
                    return Ok(context.Extras.ToList());
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
            return BadRequest("Not Found Extra");
        }



    }
}
