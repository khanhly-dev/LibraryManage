using LibraryManager.Catalog.Books.Dtos;
using LibraryManager.Catalog.Books.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManager.Catalog.Books
{
    public interface IBookAppService
    {
        Task<List<BookDto>> GetListBook(GetBookRequest request);

        Task<int> CreateOrUpdateBook(CreateOrUpdateBookRequest request);

        Task<int> DeleteBook(int id);
    }
}
