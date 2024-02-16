namespace BogdanskoQRWebApi.DataAccess.Repositories.Interfaces
{
    using BogdanskoQRWebApi.Domain.Models;
    public interface ICategoryRepository : IRepository<Category>
    {
        Task<Category> GetByIdOrNameAsync(int? id, string? name);
        Task<List<Category>> GetCategoriesForCompanyAsync(int companyId);
    }
}
