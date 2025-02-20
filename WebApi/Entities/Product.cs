namespace WebApi.Entities
{
    public class Product
    {
        public int Id { set; get; }
        public string Name { set; get; } = string.Empty;
        public string Description { set; get; } = string.Empty;
        public string price { set; get; } = string.Empty;
        public string PictureUrl { set; get; } = string.Empty;
        public int BrandId { set; get; }
        //public Brand? Brand { set; get; }
        public int ProductId { set; get; }
        //public Category? Category { set; get; }
    }
}
