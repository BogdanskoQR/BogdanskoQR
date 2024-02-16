namespace BogdanskoQRWebApi.DataAccess.Repositories.Implementations
{
    using BogdanskoQRWebApi.DataAccess.DataContext;
    using BogdanskoQRWebApi.DataAccess.Repositories.Interfaces;
    using BogdanskoQRWebApi.Domain.Models;
    using Microsoft.EntityFrameworkCore;

    public class DrinkRepository : IDrinkRepository
    {
        private readonly BogdanskoQRDbContext _dbContext;

        public DrinkRepository(BogdanskoQRDbContext _dbContext)
        {
            this._dbContext = _dbContext;
        }

        public async Task<List<Drink>> GetAllAsync()
        {
            return await _dbContext.Drinks.ToListAsync();
        }
        public async Task<Drink> GetByIdAsync(int id)
        {
            return await _dbContext.Drinks.FirstOrDefaultAsync(x => x.Id == id);
        }
        public async Task CreateAsync(Drink entity)
        {
            await _dbContext.Drinks.AddAsync(entity);
            await _dbContext.SaveChangesAsync();
        }
        public async Task UpdateAsync(Drink entity)
        {
            _dbContext.Drinks.Update(entity);
            await _dbContext.SaveChangesAsync();
        }
        public async Task DeleteAsync(int id)
        {
            Drink drinkDb = await _dbContext.Drinks.SingleOrDefaultAsync(x => x.Id == id);

            if (drinkDb == null)
                throw new Exception($"Drink with id:{id} does not exist!");

            _dbContext.Drinks.Remove(drinkDb);
            await _dbContext.SaveChangesAsync();
        }
        public async Task<List<Drink>> GetDrinksForCategoryAsync(int categoryId)
        {
            List<Drink> drinks = await _dbContext.Categories
                                           .Where(c => c.Id == categoryId)
                                           .SelectMany(c => c.Drinks)
                                           .ToListAsync();
            return drinks;
        }
    }
}
