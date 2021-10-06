using LibraryManager.Catalog.BookInBills.Dtos;
using LibraryManager.Catalog.BookInBills.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManager.Catalog.BookInBills
{
    public interface IBookInBillAppService
    {
        Task<List<BookInBillDto>> GetListBookInBill(GetBookInBillRequest request);
        Task<List<BookInBillDto>> GetListBookInBillByBillId(int id);
        Task<List<int>> CreateOrUpdateBookInBill(List<CreateOrUpdateBookInBillRequest> request);
        Task<int> DeleteBookInBill(int id);
    }
}
