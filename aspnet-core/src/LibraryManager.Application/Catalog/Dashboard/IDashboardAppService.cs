using LibraryManager.Catalog.Dashboard.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManager.Catalog.Dashboard
{
    public interface IDashboardAppService
    {
        Task<double> GetRevenueInCurentDay();
        Task<int> GetTotalBill();
        Task<int> GetAllCustomer();
        Task<List<CustomerByMonthDto>> GetCustomerByMonth(int year);
        Task<List<RevenueByMonthDto>> GetRevenueByMonth(int year);
    }
}
