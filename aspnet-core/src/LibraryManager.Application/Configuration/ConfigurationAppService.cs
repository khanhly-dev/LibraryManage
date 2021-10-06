using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using LibraryManager.Configuration.Dto;

namespace LibraryManager.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : LibraryManagerAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
