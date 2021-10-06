using Abp.Domain.Repositories;
using LibraryManager.AppEntities.Categories;
using LibraryManager.Catalog.Categories.Dtos;
using LibraryManager.Catalog.Categories.Requests;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManager.Catalog.Categories
{
    public class CategoryAppService : LibraryManagerAppServiceBase, ICategoryAppService
    {
        private readonly IRepository<CategoryEntity, int> _categoryRepos;
        public CategoryAppService(IRepository<CategoryEntity, int> categoryRepos)
        {
            _categoryRepos = categoryRepos;
        }
        public async Task<int> CreateOrUpdateCategory(CategoryDto request)
        {
            var data = new CategoryEntity
            {
                Name = request.Name,
                Description = request.Description
            };

            if(request.Id > 0)
            {
                data.Id = request.Id;
                await _categoryRepos.UpdateAsync(data);
                return request.Id;
            }
            else
            {
                await _categoryRepos.InsertAsync(data);
                return request.Id;
            }
        }

        public async Task<int> DeleteCategory(int id)
        {
            var data = await _categoryRepos.GetAsync(id);
            await _categoryRepos.DeleteAsync(data);
            return id;
        }

        public async Task<List<CategoryDto>> GetListCategory(GetCategoryRequest request)
        {
            var categoryData = _categoryRepos.GetAll();

            var query = from c in categoryData
                        select c;

            if(!string.IsNullOrEmpty(request.Keyword))
            {
                query = query.Where(x => x.Name.Trim().ToLower().Contains(request.Keyword));
            }

            var data = await query.Select(x => new CategoryDto
            {
                Id = x.Id,
                Name = x.Name,
                Description = x.Description
            }).ToListAsync();

            return data;
        }
    }
}
