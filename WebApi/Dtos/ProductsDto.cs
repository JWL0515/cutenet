using WebApi.Entities;

namespace WebApi.Dtos
{
    public class ProductsDto
    {
        public List<Product>? Products { get; set; }
        // necessary for the length in pagination 
        public int itemCount { get; set; }
    }
}
