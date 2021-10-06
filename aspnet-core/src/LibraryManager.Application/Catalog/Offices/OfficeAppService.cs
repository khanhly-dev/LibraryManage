using Abp.Domain.Repositories;
using LibraryManager.AppEntities.Offices;
using LibraryManager.Catalog.Offices.Dtos;
using LibraryManager.Catalog.Offices.Requests;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManager.Catalog.Offices
{
    public class OfficeAppService : LibraryManagerAppServiceBase, IOfficeAppService
    {
        private readonly IRepository<OfficeEntity, int> _bookRepos;
        public OfficeAppService(IRepository<OfficeEntity, int> bookRepos)
        {
            _bookRepos = bookRepos;
        }
        public async Task<int> CreateOrUpdateOfice(OfficeDto request)
        {
            var data = new OfficeEntity
            {
                Name = request.Name,
                Descripton = request.Descripton
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

        public async Task<int> DeleteOffice(int id)
        {
            var data = await _bookRepos.GetAsync(id);
            await _bookRepos.DeleteAsync(data);
            return id;
        }

        public async Task<List<OfficeDto>> GetListOfice(GetOfficeRequest request)
        {
            var query = from o in _bookRepos.GetAll()
                        select o;

            if(!string.IsNullOrEmpty(request.Keyword))
            {
                query = query.Where(x => x.Name.Trim().ToLower().Contains(request.Keyword));
            }

            var data = await query.Select(x => new OfficeDto
            {
                Id = x.Id,
                Name = x.Name,
                Descripton = x.Descripton
            }).ToListAsync();

            return data;
        }
    }
}
