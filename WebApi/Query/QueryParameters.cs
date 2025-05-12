namespace WebApi.Query
{
    public class QueryParameters
    {
        // paginate
        // number of items in 1 page
        const int _maxSize = 50;
        private int _pageSize = 3;
        public int PageSize {
            get => _pageSize;
            set
            {
                _pageSize = Math.Min(value, _maxSize);
            }
        }
        // initial page is 1
        public int Page { get; set; } = 1;

        // sort
        public string SortBy { get; set; } = "Id";
        private string _sortOrder = "asc";
        public string SortOrder { 
            get
            {
                return _sortOrder;
            }
            set
            {
                if (value == "asc" || value == "desc")
                {
                    _sortOrder = value;
                }
            }
        }
    }
}
