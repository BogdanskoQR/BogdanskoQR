namespace BogdanskoQRWebApi.DataAccess.Repositories.Interfaces
{
    using BogdanskoQRWebApi.Domain.Models;
    public interface IDrinkRepository : IRepository<Drink>
    {
        Task<Drink> GetByIdAsync(int id);
        Task<List<Drink>> GetDrinksForCategoryAsync(int categoryId);
    }
}
