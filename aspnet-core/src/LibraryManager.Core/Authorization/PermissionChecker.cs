using Abp.Authorization;
using LibraryManager.Authorization.Roles;
using LibraryManager.Authorization.Users;

namespace LibraryManager.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
