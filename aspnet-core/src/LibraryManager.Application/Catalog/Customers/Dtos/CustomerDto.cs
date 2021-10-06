using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManager.Catalog.Customers.Dtos
{
    public class CustomerDto : EntityDto<int>
    {
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime DOB { get; set; }
        public string Adress { get; set; }
    }
}
