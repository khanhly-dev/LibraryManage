using Abp.Domain.Repositories;
using Abp.Runtime.Session;
using LibraryManager.AppEntities.Bills;
using LibraryManager.AppEntities.Customers;
using LibraryManager.Authorization.Users;
using LibraryManager.Catalog.Bills.Dtos;
using LibraryManager.Catalog.Bills.Requests;
using LibraryManager.Catalog.BookInBills.Requests;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManager.Catalog.Bills
{
    public class BillAppService : LibraryManagerAppServiceBase, IBillAppService
    {
        private readonly IRepository<BillEntity, int> _billRepos;
        private readonly IRepository<CustomerEntity, int> _customerRepos;
        private readonly IAbpSession _session;
        private readonly UserManager _userManager;

        public BillAppService(
            IRepository<BillEntity, int> billRepos,
            IRepository<CustomerEntity, int> customerRepos,
            IAbpSession session,
            UserManager userManager)
        {
            _billRepos = billRepos;
            _customerRepos = customerRepos;
            _session = session;
            _userManager = userManager;
        }


        public async Task<int> CreateOrUpdateBill(CreateOrUpdateBillRequest request)
        {
            var user = await _userManager.FindByIdAsync(_session.UserId.ToString());

            var data = new BillEntity
            {
                Code = request.Code,
                CustomerId = request.CustomerId,
                UserCreated = user.UserName,
                DateCreated = DateTime.Now,
                OriginalPrice = request.OriginalPrice,
                Discout = request.Discout,
                TotalPrice = request.TotalPrice,
                Note = request.Note
            };

            if (request.Id > 0)
            {
                data.Id = request.Id;
                await _billRepos.UpdateAsync(data);
                return request.Id;
            }
            else
            {         
                return await _billRepos.InsertAndGetIdAsync(data);
            }
        }

        public async Task<int> DeleteBill(int id)
        {
            var data = await _billRepos.GetAsync(id);
            await _billRepos.DeleteAsync(data);
            return id;

        }

        public async Task<List<BillDto>> GetListBill(GetBillRequest request)
        {
            var customerQuery = _customerRepos.GetAll();
            var billQuery = _billRepos.GetAll();

            var query = from bi in billQuery
                        join c in customerQuery on bi.CustomerId equals c.Id
                        select new { bi, c };

            if (!string.IsNullOrEmpty(request.Keyword))
            {
                query = query.Where(x => x.bi.Code.Trim().ToLower().Contains(request.Keyword)
                || x.c.Name.Trim().ToLower().Contains(request.Keyword));
            }
            if (request.FromDate != null)
            {
                query = query.Where(x => DateTime.Compare(request.FromDate.Value, x.bi.DateCreated) < 0);
            }

            if (request.ToDate != null)
            {
                query = query.Where(x => DateTime.Compare(request.ToDate.Value, x.bi.DateCreated) > 0);
            }

            var data = await query.Select(x => new BillDto
            {
                Id = x.bi.Id,
                Code = x.bi.Code,
                DateCreated = x.bi.DateCreated,
                UserCreated = x.bi.UserCreated,
                OriginalPrice = x.bi.OriginalPrice,
                Discout = x.bi.Discout,
                TotalPrice = x.bi.TotalPrice,
                Note = x.bi.Note,
                CustomerName = x.c.Name
            }).ToListAsync();

            return data;
        }
    }
}
