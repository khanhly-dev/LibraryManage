using Abp.Domain.Repositories;
using LibraryManager.AppEntities.Employees;
using LibraryManager.AppEntities.Offices;
using LibraryManager.Catalog.Employees.Dtos;
using LibraryManager.Catalog.Employees.Requests;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManager.Catalog.Employees
{
    public class EmployeeAppService : LibraryManagerAppServiceBase, IEmployeeAppService
    {
        private readonly IRepository<EmployeeEntity, int> _employeeRepos;
        private readonly IRepository<OfficeEntity, int> _officeRepos;

        public EmployeeAppService(
            IRepository<EmployeeEntity, int> employeeRepos,
            IRepository<OfficeEntity, int> officeRepos)
        {
            _officeRepos = officeRepos;
            _employeeRepos = employeeRepos;
        }
        public async Task<int> CreateOrUpdateEmployee(CreateOrUpdateEmployeeRequest request)
        {
            var data = new EmployeeEntity
            {
                Name = request.Name,
                DOB = request.DOB,
                PhoneNumber = request.PhoneNumber,
                FromDate = request.FromDate,
                OfficeId = request.OfficeId,
                Status = request.Status,               
                UserId = request.UserId != null ? request.UserId.Value : null
            };

            if(request.Id > 0)
            {
                data.Id = request.Id;
                await _employeeRepos.UpdateAsync(data);
                return request.Id;
            }
            else
            {
                await _employeeRepos.InsertAsync(data);
                return request.Id;
            }
        }

        public async Task<int> DeleteEmployee(int id)
        {
            var data = await _employeeRepos.GetAsync(id);
            await _employeeRepos.DeleteAsync(data);
            return id;

        }

        public async Task<List<EmployeeDto>> GetListEmployee(GetEmployeeRequest request)
        {
            var employeeQuery = _employeeRepos.GetAll();
            var officeQuery = _officeRepos.GetAll();

            var query = from e in employeeQuery
                        join o in officeQuery on e.OfficeId equals o.Id
                        select new { e, o };

            if(!string.IsNullOrEmpty(request.Keyword))
            {
                query = query.Where(x => x.e.Name.Trim().ToLower().Contains(request.Keyword));
            }

            var data = await query.Select(x => new EmployeeDto
            {
                Id = x.e.Id,
                Name = x.e.Name,
                DOB = x.e.DOB,
                PhoneNumber = x.e.PhoneNumber,
                FromDate = x.e.FromDate,
                OfficeId = x.e.OfficeId,
                Status = x.e.Status,
                OfficeName = x.o.Name,
                UserId = x.e.UserId.Value
            }).ToListAsync();

            return data;
        }
    }
}
