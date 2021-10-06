using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManager.Catalog.BookInBills.Requests
{
    public class CreateOrUpdateBookInBillRequest
    {
        public int Id { get; set; }
        public int BillId { get; set; }
        public int BookId { get; set; }
        public int Quantity { get; set; }
    }
}
