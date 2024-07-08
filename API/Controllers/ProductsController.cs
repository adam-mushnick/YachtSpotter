using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

//this controller is responsible for handling HTTP requests related to products in the store
namespace API.Controllers
{
    public class ProductsController : BaseApiController

    {
        //declaring variable to hold database context
        private readonly StoreContext _context;

        //constructor for controller. Gets called when controller is created
        //StoreContext is injected here. Allows interaction with database
        public ProductsController(StoreContext context)
        {
            _context = context;

        }
        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            //fetch all products
            return await _context.Products.ToListAsync();

        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            //find one product
            var product = await _context.Products.FindAsync(id);

            if (product == null) return NotFound();

            return product;
        }
    }
}