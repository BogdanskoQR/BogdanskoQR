namespace BogdanskoQRWebApi.DataAccess.Repositories.Interfaces
{
    using BogdanskoQRWebApi.Domain.Models;
    public interface IRepository<T> where T : BaseEntity
    {
        Task<List<T>> GetAllAsync();
        Task CreateAsync(T entity);
        Task UpdateAsync(T entity);
        Task DeleteAsync(int id);
    }
}