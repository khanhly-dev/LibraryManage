using LibraryManager.Catalog.Categories.Dtos;
using LibraryManager.Catalog.Categories.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManager.Catalog.Categories
{
    public interface ICategoryAppService
    {
        Task<List<CategoryDto>> GetListCategory(GetCategoryRequest request);

        Task<int> CreateOrUpdateCategory(CategoryDto request);

        Task<int> DeleteCategory(int id);
    }
}
