using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManager.Catalog.Bills.Dtos
{
    public class BillDto : EntityDto<int>
    {
        public string Code { get; set; }
        public int CustomerId { get; set; }
        public string CustomerName { get; set; }
        public DateTime DateCreated { get; set; }
        public string UserCreated { get; set; }
        public double OriginalPrice { get; set; }
        public double Discout { get; set; }
        public double TotalPrice { get; set; }
        public string Note { get; set; }
    }
}
