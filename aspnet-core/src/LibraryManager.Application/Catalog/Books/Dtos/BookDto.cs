using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManager.Catalog.Books.Dtos
{
    public class BookDto : EntityDto<int>
    {
        public string Name { get; set; }
        public double Price { get; set; }
        public int Stock { get; set; }
        public string UserCreated { get; set; }
        public DateTime DateCreated { get; set; }
        public string Author { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
    }
}
