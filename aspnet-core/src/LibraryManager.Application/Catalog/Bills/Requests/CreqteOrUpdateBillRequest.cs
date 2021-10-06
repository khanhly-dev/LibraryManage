using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManager.Catalog.Bills.Requests
{
    public class CreateOrUpdateBillRequest
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public int CustomerId { get; set; }
        public double OriginalPrice { get; set; }
        public double Discout { get; set; }
        public double TotalPrice { get; set; }
        public string Note { get; set; }
    }
}
