using LibraryManager.Catalog.Employees.Dtos;
using LibraryManager.Catalog.Employees.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManager.Catalog.Employees
{
    public interface IEmployeeAppService
    {
        Task<List<EmployeeDto>> GetListEmployee(GetEmployeeRequest request);

        Task<int> CreateOrUpdateEmployee(CreateOrUpdateEmployeeRequest request);

        Task<int> DeleteEmployee(int id);
    }
}
