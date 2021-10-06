using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManager.Catalog.BookInBills.Dtos
{
    public class BookInBillDto : EntityDto<int>
    {
        public string BookName { get; set; }
        public double BookPrice { get; set; }
        public string BillCode { get; set; }
        public DateTime DateCreated { get; set; }
        public string UserCreated { get; set; }
        public double OriginalPrice { get; set; }
        public double Discout { get; set; }
        public double TotalPrice { get; set; }
        public string Note { get; set; }
        public string CustomerName { get; set; }
        public int Quantity { get; set; }
    }
}
