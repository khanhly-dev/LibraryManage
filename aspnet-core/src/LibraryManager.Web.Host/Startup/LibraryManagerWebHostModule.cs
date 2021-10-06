using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using LibraryManager.Configuration;

namespace LibraryManager.Web.Host.Startup
{
    [DependsOn(
       typeof(LibraryManagerWebCoreModule))]
    public class LibraryManagerWebHostModule: AbpModule
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public LibraryManagerWebHostModule(IWebHostEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(LibraryManagerWebHostModule).GetAssembly());
        }
    }
}
