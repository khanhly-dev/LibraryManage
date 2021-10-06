using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManager.AppEntities.Categories
{
    [Table("Categoy")]
    public class CategoryEntity : Entity<int>
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
