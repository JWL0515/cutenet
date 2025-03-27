using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Dtos;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Interfaces;
using WebApi.Query;
using WebApi.Services;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController(DogProductDbContext context,IGenericRepository<Brand> brandRepo, IGenericRepository<Category> categoryRepo) : ControllerBase
    {
        
        [HttpGet]
        public async Task<ActionResult<ProductsDto>> GetProducts([FromQuery] ProductQueryParameters queryParameters)
        {
            IQueryable<Product> products = context.Products.Include(p => p.Brand)
                .Include(p => p.Category);

            //// filter
            //if (queryParameters.MinPrice != null)
            //{
            //    products = products.Where(p => p.Price >= queryParameters.MinPrice.Value);
            //}
            //if (queryParameters.MaxPrice != null)
            //{
            //    products = products.Where(p => p.Price <= queryParameters.MaxPrice.Value);
            //}

            // search with name
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

            // get the total number of items
            var productList = await products.ToListAsync();
            var itemCount = productList.Count();

            // paginate
            products = products
            .Skip(queryParameters.PageSize * (queryParameters.Page - 1))
            .Take(queryParameters.PageSize);

            var produtcsDto = new ProductsDto
            {
                itemCount = itemCount,
                Products = await products.ToListAsync()
            };

            return Ok(produtcsDto);
        }

        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<Brand>>> GetProductBrands()
        {
            return Ok(await brandRepo.ListAllAsync());
        }

        [HttpGet("categories")]
        public async Task<ActionResult<IReadOnlyList<Category>>> GetProductCategories()
        {
            return Ok(await categoryRepo.ListAllAsync());
        }
    }
}
