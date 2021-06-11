using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApp.Data;
using TodoApp.Models;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace TodoApp.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly ApiDbContext _context;

        public TodoController(ApiDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult GetItems()
        {
            var items = _context.Items.ToList();
            return Ok(items);
        }

        [Route("GetTasksByEmail")]
        [HttpGet]
        public ActionResult GetItemsByEmail([FromQuery] string email)
        {
            var items = _context.Items.Where(x => x.Email == email).ToList(); 
            return Ok(items);
        }

        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetItem(int id)
        {
            var item = await _context.Items.FirstOrDefaultAsync(z => z.Id == id);

            if (item == null)
                return NotFound();

            return Ok(item);
        }

        [Route("Create")]
        [HttpPost]
        public async Task<IActionResult> CreateItem(Todo data)
        {
            if (ModelState.IsValid)
            {
                data.DueDate = DateTime.Now.AddHours(data.DueIn);
                await _context.Items.AddAsync(data).ConfigureAwait(false);
                await _context.SaveChangesAsync().ConfigureAwait(false);

                return CreatedAtAction("GetItem", new { data.Id }, data);
            }

            return new JsonResult("Somethign Went wrong") { StatusCode = 500 };
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateItem(int id, Todo item)
        {
            if (id != item.Id)
                return BadRequest();

            var existItem = await _context.Items.FirstOrDefaultAsync(z => z.Id == id);

            if (existItem == null)
                return NotFound();

            existItem.Name = item.Name;
            existItem.Description = item.Description;
            existItem.IsDone = item.IsDone;
            existItem.DueDate = item.DueDate;
            existItem.DueIn = item.DueIn;
            existItem.Email = item.Email;

            await _context.SaveChangesAsync();

            // Following up the REST standart on update we need to return NoContent
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(int id)
        {
            var existItem = await _context.Items.FirstOrDefaultAsync(z => z.Id == id);

            if (existItem == null)
                return NotFound();

            _context.Items.Remove(existItem);
            await _context.SaveChangesAsync();

            return Ok(existItem);
        }
    }
}
