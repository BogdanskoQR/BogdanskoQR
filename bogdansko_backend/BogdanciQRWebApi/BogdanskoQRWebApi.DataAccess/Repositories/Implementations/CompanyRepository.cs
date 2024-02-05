namespace BogdanskoQRWebApi.DataAccess.Repositories.Implementations
{
    using BogdanskoQRWebApi.DataAccess.DataContext;
    using BogdanskoQRWebApi.DataAccess.Repositories.Interfaces;
    using BogdanskoQRWebApi.Domain.Models;
    using Microsoft.EntityFrameworkCore;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public class CompanyRepository : ICompanyRepository
    {
        private readonly BogdanskoQRDbContext _dbContext;

        public CompanyRepository(BogdanskoQRDbContext _dbContext)
        {
            this._dbContext = _dbContext;
        }
        public async Task<List<Company>> GetAllAsync()
        {
            return await _dbContext.Companies.ToListAsync();
        }
        public async Task<Company> GetByIdAsync(int id)
        {
            return await _dbContext.Companies.FirstOrDefaultAsync(x => x.Id == id);
        }
        public async Task CreateAsync(Company entity)
        {
            await _dbContext.Companies.AddAsync(entity);
            await _dbContext.SaveChangesAsync();
        }
        public async Task UpdateAsync(Company entity)
        {
            _dbContext.Companies.Update(entity);
            await _dbContext.SaveChangesAsync();
        }
        public async Task DeleteAsync(int id)
        {
            Company companyDb = await _dbContext.Companies.SingleOrDefaultAsync(x => x.Id == id);

            if (companyDb == null)
                throw new Exception($"Company with id:{id} does not exist!");

            _dbContext.Companies.Remove(companyDb);
            await _dbContext.SaveChangesAsync();
        }
    }
}
