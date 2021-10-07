using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManager.AppEntities.Customers
{
    [Table("Customer")]
    public class CustomerEntity : Entity<int>
    {
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime DOB { get; set; }
        public string Adress { get; set; }
        public DateTime DateCreated { get; set; }
    }
}
