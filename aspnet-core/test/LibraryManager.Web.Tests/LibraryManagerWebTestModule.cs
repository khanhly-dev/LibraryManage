using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using LibraryManager.EntityFrameworkCore;
using LibraryManager.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace LibraryManager.Web.Tests
{
    [DependsOn(
        typeof(LibraryManagerWebMvcModule),
        typeof(AbpAspNetCoreTestBaseModule)
    )]
    public class LibraryManagerWebTestModule : AbpModule
    {
        public LibraryManagerWebTestModule(LibraryManagerEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
        } 
        
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(LibraryManagerWebTestModule).GetAssembly());
        }
        
        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(LibraryManagerWebMvcModule).Assembly);
        }
    }
}