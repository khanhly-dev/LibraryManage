using LibraryManager.Catalog.Bills.Dtos;
using LibraryManager.Catalog.Bills.Requests;
using LibraryManager.Catalog.BookInBills.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManager.Catalog.Bills
{
    public interface IBillAppService
    {
        Task<List<BillDto>> GetListBill(GetBillRequest request);
        Task<int> CreateOrUpdateBill(CreateOrUpdateBillRequest request);
        Task<int> DeleteBill(int id);
    }
}
