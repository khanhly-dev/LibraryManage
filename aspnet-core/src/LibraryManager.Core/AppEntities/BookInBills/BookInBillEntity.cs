using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManager.AppEntities.BookInBills
{
    [Table("BookInBill")]
    public class BookInBillEntity : Entity<int>
    {
        public int BookId { get; set; }
        public int BillId { get; set; }
        public int Quantity { get; set; }
    }
}
