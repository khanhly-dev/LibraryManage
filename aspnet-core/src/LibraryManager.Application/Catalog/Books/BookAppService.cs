using Abp.Domain.Repositories;
using Abp.Runtime.Session;
using LibraryManager.AppEntities.Books;
using LibraryManager.AppEntities.Categories;
using LibraryManager.Authorization.Users;
using LibraryManager.Catalog.Books.Dtos;
using LibraryManager.Catalog.Books.Requests;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManager.Catalog.Books
{
    public class BookAppService : LibraryManagerAppServiceBase, IBookAppService
    {
        private readonly IRepository<CategoryEntity, int> _categoryRepos;
        private readonly IRepository<BookEntity, int> _bookRepos;
        private readonly IAbpSession _session;
        private readonly UserManager _userManager;

        public BookAppService(
            IRepository<CategoryEntity, int> categoryRepos,
            IRepository<BookEntity, int> bookRepos,
            IAbpSession session,
            UserManager userManager)
        {
            _categoryRepos = categoryRepos;
            _bookRepos = bookRepos;
            _session = session;
            _userManager = userManager;
        }
        public async Task<int> CreateOrUpdateBook(CreateOrUpdateBookRequest request)
        {
            var user = await _userManager.FindByIdAsync(_session.UserId.ToString());

            var data = new BookEntity
            {
                Id = request.Id,
                Name = request.Name,
                Price = request.Price,
                Stock = request.Stock,
                UserCreated = user.UserName,
                DateCreated = DateTime.Now,
                Author = request.Author,
                CategoryId = request.CategoryId
            };

            if(request.Id > 0)
            {
                data.Id = request.Id;
                await _bookRepos.UpdateAsync(data);
                return request.Id;
            }
            else
            {
                await _bookRepos.InsertAsync(data);
                return request.Id;
            }
        }

        public async Task<int> DeleteBook(int id)
        {
            var data = await _bookRepos.GetAsync(id);
            await _bookRepos.DeleteAsync(data);
            return id;
        }

        public async Task<List<BookDto>> GetListBook(GetBookRequest request)
        {
            var bookQuery = _bookRepos.GetAll();
            var categoryQuery = _categoryRepos.GetAll();

            var query = from b in bookQuery
                        join c in categoryQuery on b.CategoryId equals c.Id
                        select new { b, c };

            if(!string.IsNullOrEmpty(request.Keyword))
            {
                query = query.Where(x => x.b.Name.Trim().ToLower().Contains(request.Keyword));
            }

            var data = await query.Select(x => new BookDto
            {
                Id = x.b.Id,
                Name = x.b.Name,
                Price = x.b.Price,
                Stock = x.b.Stock,
                UserCreated = x.b.UserCreated,
                DateCreated = x.b.DateCreated,
                Author = x.b.Author,
                CategoryId = x.b.CategoryId,
                CategoryName = x.c.Name
            }).ToListAsync();

            return data;
        }
    }
}
