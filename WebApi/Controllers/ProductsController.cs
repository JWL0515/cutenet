using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Entities;
using WebApi.Query;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController(DogProductDbContext context) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetAllProducts([FromQuery] ProductQueryParameters queryParameters)
        {
            IQueryable<Product> products = context.Products;

            // filter
            if (queryParameters.MinPrice != null)
            {
                products = products.Where(p => p.Price >= queryParameters.MinPrice.Value);
            }
            if (queryParameters.MaxPrice != null)
            {
                products = products.Where(p => p.Price <= queryParameters.MaxPrice.Value);
            }

            // search
            if (!string.IsNullOrEmpty(queryParameters.Brand))
            {
                products = products.Where(p => p.Brand.Name.ToLower() == queryParameters.Brand.ToLower());
            }
            if (!string.IsNullOrEmpty(queryParameters.Category))
            {
                products = products.Where(p => p.Category.Name.ToLower() == queryParameters.Category.ToLower());
            }



            // paginate
            products = products
            .Skip(queryParameters.Size * (queryParameters.Page - 1))
            .Take(queryParameters.Size);

            return Ok(await products
                .Include(p => p.Brand)
                .Include(p => p.Category)
                .ToListAsync());
        }
    }
}
