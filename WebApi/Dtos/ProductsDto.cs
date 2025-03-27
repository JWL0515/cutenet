using WebApi.Entities;

namespace WebApi.Dtos
{
    public class ProductsDto
    {
        public List<Product>? Products { get; set; }
        public int itemCount { get; set; }
    }
}
