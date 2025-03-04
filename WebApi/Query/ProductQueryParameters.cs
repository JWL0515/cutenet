namespace WebApi.Query
{
    public class ProductQueryParameters : QueryParameters
    {
        // filter
        public decimal? MinPrice { get; set; }
        public decimal? MaxPrice { get; set; }

    }
}
