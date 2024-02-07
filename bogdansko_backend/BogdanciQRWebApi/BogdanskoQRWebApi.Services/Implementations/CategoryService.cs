namespace BogdanskoQRWebApi.Services.Implementations
{
    using BogdanskoQRWebApi.DataAccess.Repositories.Interfaces;
    using BogdanskoQRWebApi.Domain.Models;
    using BogdanskoQRWebApi.DTOs.CategoryDTOs;
    using BogdanskoQRWebApi.Mappers;
    using BogdanskoQRWebApi.Services.Interfaces;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;

        public CategoryService(ICategoryRepository _categoryRepository)
        {
            this._categoryRepository = _categoryRepository;
        }
        public async Task<List<CategoryDTO>> GetAllCategoriesAsync()
        {
            List<Category> categoryDb = await _categoryRepository.GetAllAsync();

            if (categoryDb == null)
                throw new Exception("Contact the support team");

            return categoryDb.Select(x => x.ToCategoryDTO()).ToList();
        }
        public async Task<CategoryDTO> GetCategoryByIdAsync(int id)
        {
            Category categoryDb = await _categoryRepository.GetByIdAsync(id);

            if (categoryDb == null)
                throw new Exception("Contact the support team");

            return categoryDb.ToCategoryDTO();
        }
        public async Task CreateCategoryAsync(CreateCategoryDTO createCategoryDTO)
        {
            Category categoryDb = createCategoryDTO.ToCategory();
            await _categoryRepository.CreateAsync(categoryDb);
        }
        public async Task EditCategoryAsync(EditCategoryDTO editCategoryDTO)
        {
            Category categoryDb = await _categoryRepository.GetByIdAsync(editCategoryDTO.Id);

            if (categoryDb == null)
                throw new Exception("The category can not be found!");

            categoryDb.BackgroundImage = editCategoryDTO.BackgroundImage;
            categoryDb.Name = editCategoryDTO.Name;
            categoryDb.CompanyId = editCategoryDTO.CompanyId;

            await _categoryRepository.UpdateAsync(categoryDb);

        }
        public async Task DeleteCategoryAsync(int id)
        {
            await _categoryRepository.DeleteAsync(id);
        }
    }
}
