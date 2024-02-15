namespace BogdanskoQRWebApi.DataAccess.Repositories.Interfaces
{
    using BogdanskoQRWebApi.Domain.Models;
    public interface ICompanyRepository : IRepository<Company>
    {
        Task<Company> GetByIdOrNameAsync(int? id, string? name);
    }
}
