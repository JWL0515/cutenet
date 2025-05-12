namespace WebApi.Entities
{
    public class Basket
    {
        public string Id { get; set; }
        public List<BasketItem> Items { get; set; } = new List<BasketItem>();
    }
}
