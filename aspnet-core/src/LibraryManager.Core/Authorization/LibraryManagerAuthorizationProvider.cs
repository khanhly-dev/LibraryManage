using Abp.Authorization;
using Abp.Localization;
using Abp.MultiTenancy;

namespace LibraryManager.Authorization
{
    public class LibraryManagerAuthorizationProvider : AuthorizationProvider
    {
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            context.CreatePermission(PermissionNames.Pages_Users_Activation, L("Kích hoạt tài khoản"));
            context.CreatePermission(PermissionNames.Pages_Tenants, L("Đối tượng sử dụng"), multiTenancySides: MultiTenancySides.Host);

            context.CreatePermission(PermissionNames.Pages_Home, L("Dashboard"));

            var system = context.CreatePermission(PermissionNames.Pages_System, L("Hệ thống"));
            system.CreateChildPermission(PermissionNames.Pages_Users, L("Tài khoản"));
            system.CreateChildPermission(PermissionNames.Pages_Roles, L("Phân quyền"));

            var cash = context.CreatePermission(PermissionNames.Pages_Cash, L("Thu ngân"));
            cash.CreateChildPermission(PermissionNames.Pages_Bill, L("Hóa đơn"));
            cash.CreateChildPermission(PermissionNames.Pages_BookInBill, L("Thanh toán"));
            cash.CreateChildPermission(PermissionNames.Pages_Customer, L("Khách hàng"));

            var inter = context.CreatePermission(PermissionNames.Pages_Internal, L("Nội bộ"));
            inter.CreateChildPermission(PermissionNames.Pages_Employee, L("Nhân viên"));
            inter.CreateChildPermission(PermissionNames.Pages_Office, L("Chức vụ"));

            var product = context.CreatePermission(PermissionNames.Pages_Product, L("Sản phẩm"));
            product.CreateChildPermission(PermissionNames.Pages_Book, L("Danh mục sách"));
            product.CreateChildPermission(PermissionNames.Pages_Category, L("Phân loại sách"));
        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, LibraryManagerConsts.LocalizationSourceName);
        }
    }
}
