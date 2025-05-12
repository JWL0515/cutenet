namespace WebApi.Query
{
    public class ProductQueryParameters : QueryParameters
    {
        // filter
        public decimal? MinPrice { get; set; }
        public decimal? MaxPrice { get; set; }

        // search
        public string Brand { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
    }
}
