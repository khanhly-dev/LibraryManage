using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManager.AppEntities.Bills
{
    [Table("Bill")]
    public class BillEntity : Entity<int>
    {
        public string Code { get; set; }
        public int CustomerId { get; set; }
        public DateTime DateCreated { get; set; }
        public string UserCreated { get; set; }
        public double OriginalPrice { get; set; }
        public double Discout { get; set; }
        public double TotalPrice { get; set; }
        public string Note { get; set; }
    }
}
