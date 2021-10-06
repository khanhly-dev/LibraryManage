using LibraryManager.Catalog.Customers.Dtos;
using LibraryManager.Catalog.Customers.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManager.Catalog.Customers
{
    public interface ICustomerAppService
    {
        Task<List<CustomerDto>> GetListCustomer(GetCustomerRequest request);

        Task<int> CreateOrUpdateCustomer(CustomerDto request);

        Task<int> DeleteCustomer(int id);
    }
}
