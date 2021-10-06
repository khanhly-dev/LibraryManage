using System.Threading.Tasks;
using LibraryManager.Models.TokenAuth;
using LibraryManager.Web.Controllers;
using Shouldly;
using Xunit;

namespace LibraryManager.Web.Tests.Controllers
{
    public class HomeController_Tests: LibraryManagerWebTestBase
    {
        [Fact]
        public async Task Index_Test()
        {
            await AuthenticateAsync(null, new AuthenticateModel
            {
                UserNameOrEmailAddress = "admin",
                Password = "123qwe"
            });

            //Act
            var response = await GetResponseAsStringAsync(
                GetUrl<HomeController>(nameof(HomeController.Index))
            );

            //Assert
            response.ShouldNotBeNullOrEmpty();
        }
    }
}