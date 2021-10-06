using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using LibraryManager.Authorization;

namespace LibraryManager
{
    [DependsOn(
        typeof(LibraryManagerCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class LibraryManagerApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<LibraryManagerAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(LibraryManagerApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddMaps(thisAssembly)
            );
        }
    }
}
