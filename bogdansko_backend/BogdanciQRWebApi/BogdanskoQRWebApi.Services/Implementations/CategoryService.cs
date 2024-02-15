namespace BogdanskoQRWebApi.Services.Implementations
{
    using BogdanskoQRWebApi.DataAccess.Repositories.Interfaces;
    using BogdanskoQRWebApi.Domain.Models;
    using BogdanskoQRWebApi.DTOs.CategoryDTOs;
    using BogdanskoQRWebApi.DTOs.DrinkDTOs;
    using BogdanskoQRWebApi.Mappers;
    using BogdanskoQRWebApi.Services.Interfaces;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IDrinkRepository _drinkRepository;

        public CategoryService(ICategoryRepository _categoryRepository, IDrinkRepository _drinkRepository)
        {
            this._categoryRepository = _categoryRepository;
            this._drinkRepository = _drinkRepository;
        }
        public async Task<List<CategoryDTO>> GetAllCategoriesAsync()
        {
            List<Category> categoriesDb = await _categoryRepository.GetAllAsync();

            if (categoriesDb == null)
                throw new Exception("Failed to fetch categories from the database.");

            List<CategoryDTO> categoriesDTO = categoriesDb.Select(x => x.ToCategoryDTO()).ToList();

            foreach (var category in categoriesDTO)
            {
                List<Drink> drinksDb = await _drinkRepository.GetDrinksForCategoryAsync(category.Id);
                category.Drinks = drinksDb.Select(x => x.ToDrinkDTO()).ToList();
            }

            return categoriesDTO;
        }

        public async Task<CategoryDTO> GetCategoryByIdOrNameAsync(int? id, string? name)
        {
            if (id.HasValue)
            {
                Category categoryDbById = await _categoryRepository.GetByIdOrNameAsync(id, null);
                if (categoryDbById == null)
                    throw new Exception("Contact the support team");

                // Fetch drinks for the category
                List<Drink> drinksDb = await _drinkRepository.GetDrinksForCategoryAsync(categoryDbById.Id);
                List<DrinkDTO> drinksDTO = drinksDb.Select(d => d.ToDrinkDTO()).ToList();

                // Map category to DTO
                CategoryDTO categoryDTO = categoryDbById.ToCategoryDTO();
                categoryDTO.Drinks = drinksDTO;

                return categoryDTO;
            }
            else if (!string.IsNullOrEmpty(name))
            {
                Category categoryDbByName = await _categoryRepository.GetByIdOrNameAsync(null, name);
                if (categoryDbByName == null)
                    throw new Exception("Contact the support team");

                // Fetch drinks for the category (similar to the above process)
                List<Drink> drinksDb = await _drinkRepository.GetDrinksForCategoryAsync(categoryDbByName.Id);
                List<DrinkDTO> drinksDTO = drinksDb.Select(d => d.ToDrinkDTO()).ToList();

                // Map category to DTO (similar to the above process)
                CategoryDTO categoryDTO = categoryDbByName.ToCategoryDTO();
                categoryDTO.Drinks = drinksDTO;

                return categoryDTO;
            }
            else
            {
                throw new ArgumentException("Both id and name cannot be null or empty.");
            }
        }

        public async Task CreateCategoryAsync(CreateCategoryDTO createCategoryDTO)
        {
            Category categoryDb = createCategoryDTO.ToCategory();
            await _categoryRepository.CreateAsync(categoryDb);
        }
        public async Task EditCategoryAsync(EditCategoryDTO editCategoryDTO)
        {
            Category categoryDb = await _categoryRepository.GetByIdOrNameAsync(editCategoryDTO.Id, null);

            if (categoryDb == null)
                throw new Exception("The category can not be found!");

            categoryDb.BackgroundImage = editCategoryDTO.BackgroundImage;
            categoryDb.Name = editCategoryDTO.Name;
            categoryDb.View = editCategoryDTO.View;
            categoryDb.CompanyId = editCategoryDTO.CompanyId;

            await _categoryRepository.UpdateAsync(categoryDb);
        }
        public async Task DeleteCategoryAsync(int id)
        {
            await _categoryRepository.DeleteAsync(id);
        }
    }
}
