using LibraryManager.Catalog.Offices.Dtos;
using LibraryManager.Catalog.Offices.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManager.Catalog.Offices
{
    public interface IOfficeAppService
    {
        Task<List<OfficeDto>> GetListOfice(GetOfficeRequest request);

        Task<int> CreateOrUpdateOfice(OfficeDto request);

        Task<int> DeleteOffice(int id);
    }
}
