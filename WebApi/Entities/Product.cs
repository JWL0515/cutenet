﻿namespace WebApi.Entities
{
    public class Product : BaseEntity
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string PictureUrl { get; set; } = string.Empty;

        // Many to One
        public int BrandId { get; set; }
        public Brand Brand { get; set; } = null!;

        // Many to One
        public int CategoryId { get; set; }
        public Category Category { get; set; } = null!;
    }
}
