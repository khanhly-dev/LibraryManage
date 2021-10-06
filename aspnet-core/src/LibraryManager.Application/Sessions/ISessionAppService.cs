using System.Threading.Tasks;
using Abp.Application.Services;
using LibraryManager.Sessions.Dto;

namespace LibraryManager.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
