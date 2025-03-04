using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Entities;
using WebApi.Helpers;
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
            IQueryable<Product> products = context.Products.Include(p => p.Brand)
                .Include(p => p.Category);

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

            // sort
            if (!string.IsNullOrEmpty(queryParameters.SortBy))
            {
                if (typeof(Product).GetProperty(queryParameters.SortBy) != null)
                {
                    products = products.OrderByCustom(
                        queryParameters.SortBy,
                        queryParameters.SortOrder);
                }
            }

            // paginate
            products = products
            .Skip(queryParameters.PageSize * (queryParameters.Page - 1))
            .Take(queryParameters.PageSize);

            return Ok(await products.ToListAsync());
        }
    }
}
