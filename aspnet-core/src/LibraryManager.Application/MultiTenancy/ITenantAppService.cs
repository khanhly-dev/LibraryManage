using Abp.Application.Services;
using LibraryManager.MultiTenancy.Dto;

namespace LibraryManager.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}

