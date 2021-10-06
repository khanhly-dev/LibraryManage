using Abp.Domain.Repositories;
using Abp.Runtime.Session;
using LibraryManager.AppEntities.Bills;
using LibraryManager.AppEntities.BookInBills;
using LibraryManager.AppEntities.Books;
using LibraryManager.AppEntities.Customers;
using LibraryManager.Authorization.Users;
using LibraryManager.Catalog.BookInBills.Dtos;
using LibraryManager.Catalog.BookInBills.Requests;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManager.Catalog.BookInBills
{
    public class BookInBillAppService : LibraryManagerAppServiceBase, IBookInBillAppService
    {
        private readonly IRepository<BillEntity, int> _billRepos;
        private readonly IRepository<BookEntity, int> _bookRepos;
        private readonly IRepository<BookInBillEntity, int> _bookInBillRepos;
        private readonly IRepository<CustomerEntity, int> _customerRepos;
        private readonly IAbpSession _session;
        private readonly UserManager _userManager;

        public BookInBillAppService(
            IRepository<BillEntity, int> billRepos,
            IRepository<BookEntity, int> bookRepos,
            IRepository<BookInBillEntity, int> bookInBillRepos,
            IRepository<CustomerEntity, int> customerRepos,
            IAbpSession session,
            UserManager userManager)
        {
            _billRepos = billRepos;
            _bookRepos = bookRepos;
            _bookInBillRepos = bookInBillRepos;
            _customerRepos = customerRepos;
            _session = session;
            _userManager = userManager;
        }

        public async Task<List<int>> CreateOrUpdateBookInBill(List<CreateOrUpdateBookInBillRequest> request)
        {
            var listIdRequest = new List<int>();
            foreach (var item in request)
            {
                var data = new BookInBillEntity
                {
                    BillId = item.BillId,
                    BookId = item.BookId,
                    Quantity = item.Quantity
                };
                listIdRequest.Add(item.Id);
                if (item.Id > 0)
                {
                    data.Id = item.Id;
                    await _bookInBillRepos.UpdateAsync(data);
                }
                else
                {
                    await _bookInBillRepos.InsertAsync(data);
                }
            }

            return listIdRequest;
        }

        public async Task<int> DeleteBookInBill(int id)
        {
            var data = await _bookInBillRepos.GetAsync(id);
            await _bookInBillRepos.DeleteAsync(data);
            return id;
        }

        public async Task<List<BookInBillDto>> GetListBookInBill(GetBookInBillRequest request)
        {
            var bookQuery = _bookRepos.GetAll();
            var customerQuery = _customerRepos.GetAll();
            var billQuery = _billRepos.GetAll();
            var bookInBillQuery = _bookInBillRepos.GetAll();

            var query = from bi in billQuery
                        join bib in bookInBillQuery on bi.Id equals bib.BillId
                        join bo in bookQuery on bib.BookId equals bo.Id
                        join c in customerQuery on bi.CustomerId equals c.Id
                        select new { bi, bib, bo, c };

            if(!string.IsNullOrEmpty(request.Keyword))
            {
                query = query.Where(x => x.bo.Name.Trim().ToLower().Contains(request.Keyword) 
                || x.bi.Code.Trim().ToLower().Contains(request.Keyword) 
                || x.c.Name.Trim().ToLower().Contains(request.Keyword));
            }

            var data = await query.Select(x => new BookInBillDto
            {
                Id = x.bib.Id,
                BookName = x.bo.Name,
                BookPrice = x.bo.Price,
                BillCode = x.bi.Code,
                DateCreated = x.bi.DateCreated,
                UserCreated = x.bi.UserCreated,
                OriginalPrice = x.bi.OriginalPrice,
                Discout = x.bi.Discout,
                TotalPrice = x.bi.TotalPrice,
                Note = x.bi.Note,
                CustomerName = x.c.Name,
                Quantity = x.bib.Quantity
            }).ToListAsync();

            return data;
        }

        public async Task<List<BookInBillDto>> GetListBookInBillByBillId(int id)
        {
            var bookQuery = _bookRepos.GetAll();
            var customerQuery = _customerRepos.GetAll();
            var billQuery = _billRepos.GetAll();
            var bookInBillQuery = _bookInBillRepos.GetAll();

            var query = from bi in billQuery where bi.Id == id
                        join bib in bookInBillQuery on bi.Id equals bib.BillId
                        join bo in bookQuery on bib.BookId equals bo.Id
                        join c in customerQuery on bi.CustomerId equals c.Id
                        select new { bi, bib, bo, c };

            var data = await query.Select(x => new BookInBillDto
            {
                Id = x.bib.Id,
                BookName = x.bo.Name,
                BookPrice = x.bo.Price,
                BillCode = x.bi.Code,
                DateCreated = x.bi.DateCreated,
                UserCreated = x.bi.UserCreated,
                OriginalPrice = x.bi.OriginalPrice,
                Discout = x.bi.Discout,
                TotalPrice = x.bi.TotalPrice,
                Note = x.bi.Note,
                CustomerName = x.c.Name,
                Quantity = x.bib.Quantity
            }).ToListAsync();

            return data;
        }
    }
}
