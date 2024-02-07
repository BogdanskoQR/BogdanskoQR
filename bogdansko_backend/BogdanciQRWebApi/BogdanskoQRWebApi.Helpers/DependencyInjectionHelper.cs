namespace BogdanskoQRWebApi.Helpers
{
    using BogdanskoQRWebApi.DataAccess.DataContext;
    using BogdanskoQRWebApi.DataAccess.Repositories.Implementations;
    using BogdanskoQRWebApi.DataAccess.Repositories.Interfaces;
    using BogdanskoQRWebApi.Services.Implementations;
    using BogdanskoQRWebApi.Services.Interfaces;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.DependencyInjection;

    public static class DependencyInjectionHelper
    {
        public static void InjectDbContext(this IServiceCollection services, string connectionString)
        {
            services.AddDbContext<BogdanskoQRDbContext>(options => options.UseSqlServer(connectionString));
        }

        public static void InjectRepositories(this IServiceCollection services)
        {
            services.AddTransient<ICompanyRepository, CompanyRepository>();
            services.AddTransient<ICategoryRepository, CategoryRepository>();
            services.AddTransient<IDrinkRepository, DrinkRepository>();
        }

        public static void InjectServices(this IServiceCollection services)
        {
            services.AddTransient<ICompanyService, CompanyService>();
            services.AddTransient<ICategoryService, CategoryService>();
            services.AddTransient<IDrinkService, DrinkService>();
        }
    }
}
