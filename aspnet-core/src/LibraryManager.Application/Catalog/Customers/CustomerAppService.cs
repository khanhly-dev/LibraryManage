using Abp.Domain.Repositories;
using LibraryManager.AppEntities.Customers;
using LibraryManager.Catalog.Customers.Dtos;
using LibraryManager.Catalog.Customers.Requests;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManager.Catalog.Customers
{
    public class CustomerAppService : LibraryManagerAppServiceBase, ICustomerAppService
    {
        private readonly IRepository<CustomerEntity, int> _customerRepos;
        public CustomerAppService(IRepository<CustomerEntity, int> customerRepos)
        {
            _customerRepos = customerRepos;
        }
        public async Task<int> CreateOrUpdateCustomer(CustomerDto request)
        {
            var data = new CustomerEntity
            {
                Name = request.Name,
                DOB = request.DOB,
                PhoneNumber = request.PhoneNumber,
                Adress = request.Adress,
                DateCreated = DateTime.Now
            };

            if(request.Id > 0)
            {
                var cus = await _customerRepos.GetAsync(request.Id);
                cus.Name = request.Name;
                cus.DOB = request.DOB;
                cus.PhoneNumber = request.PhoneNumber;
                cus.Adress = request.Adress;
                await _customerRepos.UpdateAsync(cus);
                return request.Id;
            }
            else
            {
                await _customerRepos.InsertAsync(data);
                return request.Id;
            }    
        }

        public async Task<int> DeleteCustomer(int id)
        {
            var data = await _customerRepos.GetAsync(id);
            await _customerRepos.DeleteAsync(data);
            return id;
        }

        public async Task<List<CustomerDto>> GetListCustomer(GetCustomerRequest request)
        {
            var query = from c in _customerRepos.GetAll()
                        select c;

            if(!string.IsNullOrEmpty(request.Keyword))
            {
                query = query.Where(x => x.Name.Trim().ToLower().Contains(request.Keyword));
            }

            var data = await query.Select(x => new CustomerDto
            {
                Id = x.Id,
                Name = x.Name,
                PhoneNumber = x.PhoneNumber,
                DOB = x.DOB,
                Adress = x.Adress
            }).ToListAsync();

            return data;
        }
    }
}
