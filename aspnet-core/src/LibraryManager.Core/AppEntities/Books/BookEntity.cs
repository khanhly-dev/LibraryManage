using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManager.AppEntities.Books
{
    [Table("Book")]
    public class BookEntity : Entity<int>
    {
        public string Name { get; set; }
        public double Price { get; set; }
        public int Stock { get; set; }
        public string UserCreated { get; set; }
        public DateTime DateCreated { get; set; }
        public string Author { get; set; }
        public int CategoryId { get; set; }
    }
}
