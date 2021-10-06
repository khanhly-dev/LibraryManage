using System.Threading.Tasks;
using LibraryManager.Configuration.Dto;

namespace LibraryManager.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
