namespace WebApi.Query
{
    public class QueryParameters
    {
        // paginate
        // number of items in 1 page
        const int _maxSize = 9;
        private int _size = 3;
        public int Size {
            get => _size;
            set
            {
                _size = Math.Min(value, _maxSize);
            }
        }
        // initial page is 1
        public int Page { get; set; } = 1;
    }
}
