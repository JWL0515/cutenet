using WebApi.Entities;

namespace WebApi.Dtos
{
    public class ProductDto
    {
        public int id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string PictureUrl { get; set; } = string.Empty;
        public Brand Brand { get; set; } = null!;
        public Category Category { get; set; } = null!;
    }
}
