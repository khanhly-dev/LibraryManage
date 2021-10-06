using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManager.AppEntities.Offices
{
    [Table("Office")]
    public class OfficeEntity : Entity<int>
    {
        public string Name { get; set; }
        public string Descripton { get; set; }
    }
}
