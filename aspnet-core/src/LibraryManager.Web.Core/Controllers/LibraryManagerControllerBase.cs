using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace LibraryManager.Controllers
{
    public abstract class LibraryManagerControllerBase: AbpController
    {
        protected LibraryManagerControllerBase()
        {
            LocalizationSourceName = LibraryManagerConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
