namespace BogdanskoQRWebApi.DataAccess.Repositories.Implementations
{
    using BogdanskoQRWebApi.DataAccess.DataContext;
    using BogdanskoQRWebApi.DataAccess.Repositories.Interfaces;
    using BogdanskoQRWebApi.Domain.Models;
    using Microsoft.EntityFrameworkCore;

    public class CategoryRepository : ICategoryRepository
    {
        private readonly BogdanskoQRDbContext _dbContext;

        public CategoryRepository(BogdanskoQRDbContext _dbContext)
        {
            this._dbContext = _dbContext;
        }
        public async Task<List<Category>> GetAllAsync()
        {
            return await _dbContext.Categories.ToListAsync();
        }
        public async Task<Category> GetByIdAsync(int id)
        {
            return await _dbContext.Categories.FirstOrDefaultAsync(x => x.Id == id);
        }
        public async Task CreateAsync(Category entity)
        {
            await _dbContext.Categories.AddAsync(entity);
            await _dbContext.SaveChangesAsync();
        }
        public async Task UpdateAsync(Category entity)
        {
            _dbContext.Categories.Update(entity);
            await _dbContext.SaveChangesAsync();
        }
        public async Task DeleteAsync(int id)
        {
            Category categoryDb = await _dbContext.Categories.SingleOrDefaultAsync(x => x.Id == id);

            if(categoryDb == null)
                throw new Exception($"Category with id:{id} does not exist!");

            _dbContext.Categories.Remove(categoryDb);
            await _dbContext.SaveChangesAsync();

        }
    }
}
