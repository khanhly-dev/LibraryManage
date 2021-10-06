using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManager.Catalog.Books.Requests
{
    public class CreateOrUpdateBookRequest
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public int Stock { get; set; }
        public string Author { get; set; }
        public int CategoryId { get; set; }
    }
}
