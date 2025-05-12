namespace WebApi.Entities
{
    public class BasketItem
    {
        public string ProductName { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public string PictureUrl { get; set; } = string.Empty;
        public string Brand { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
    }
}
