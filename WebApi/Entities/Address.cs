namespace WebApi.Entities
{
    public class Address
    {
        public int Id { set; get; }
        public string Name { set; get; } = string.Empty;
        public string Street { set; get; } = string.Empty;
        public string City { set; get; } = string.Empty;
        public string ZipCode { set; get; } = string.Empty;
        //public string Country { set; get; } = string.Empty;
    }
}
