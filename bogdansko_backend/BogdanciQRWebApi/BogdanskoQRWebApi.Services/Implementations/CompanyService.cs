namespace BogdanskoQRWebApi.Services.Implementations
{
    using BogdanskoQRWebApi.DataAccess.Repositories.Interfaces;
    using BogdanskoQRWebApi.Domain.Models;
    using BogdanskoQRWebApi.DTOs.CompanyDTOs;
    using BogdanskoQRWebApi.Services.Interfaces;
    using BogdanskoQRWebApi.Mappers;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using BogdanskoQRWebApi.DataAccess.Repositories.Implementations;
    using BogdanskoQRWebApi.DTOs.CategoryDTOs;
    using BogdanskoQRWebApi.DTOs.DrinkDTOs;

    public class CompanyService : ICompanyService
    {
        private readonly ICompanyRepository _companyRepository;
        private readonly ICategoryRepository _categoryRepository;
        private readonly IDrinkRepository _drinkRepository;

        public CompanyService(ICompanyRepository _companyRepository, ICategoryRepository _categoryRepository, IDrinkRepository _drinkRepository)
        {
            this._companyRepository = _companyRepository;
            this._categoryRepository = _categoryRepository;
            this._drinkRepository = _drinkRepository;
        }
        public async Task<List<CompanyDTO>> GetAllCompaniesAsync()
        {
            List<Company> companyDb = await _companyRepository.GetAllAsync();

            if (companyDb == null)
                throw new Exception("Contact the support team");

            List<CompanyDTO> companiesDTO = new List<CompanyDTO>();

            foreach (var company in companyDb)
            {
                CompanyDTO companyDTO = company.ToCompanyDTO();

                List<Category> categoriesDb = await _categoryRepository.GetCategoriesForCompanyAsync(company.Id);
                List<CategoryDTO> categoriesDTO = new List<CategoryDTO>();

                foreach (var category in categoriesDb)
                {
                    CategoryDTO categoryDTO = category.ToCategoryDTO();

                    // Get drinks for the current category
                    List<Drink> drinksDb = await _drinkRepository.GetDrinksForCategoryAsync(category.Id);
                    List<DrinkDTO> drinksDTO = drinksDb.Select(d => d.ToDrinkDTO()).ToList();

                    categoryDTO.Drinks = drinksDTO;

                    // Add the category DTO to the list
                    categoriesDTO.Add(categoryDTO);
                }

                // Assign categories to the company DTO
                companyDTO.Categories = categoriesDTO;

                // Add the company DTO to the list
                companiesDTO.Add(companyDTO);
            }
            return companiesDTO;
        }

        public async Task<CompanyDTO> GetCompanyByIdOrNameAsync(int? id, string? name)
        {
            if (id.HasValue)
            {
                Company companyDbById = await _companyRepository.GetByIdOrNameAsync(id, null);
                if (companyDbById == null)
                    throw new Exception("Contact the support team");

                // Fetch categories for the company
                List<Category> categoriesDb = await _categoryRepository.GetCategoriesForCompanyAsync(companyDbById.Id);
                List<CategoryDTO> categoriesDTO = categoriesDb.Select(x => x.ToCategoryDTO()).ToList();

                // Fetch drinks for each category
                foreach (var category in categoriesDb)
                {
                    List<Drink> drinksDb = await _drinkRepository.GetDrinksForCategoryAsync(category.Id);
                    List<DrinkDTO> drinksDTO = drinksDb.Select(d => d.ToDrinkDTO()).ToList();
                    categoriesDTO.First(x => x.Id == category.Id).Drinks = drinksDTO;
                }

                // Map company to DTO
                CompanyDTO companyDTO = companyDbById.ToCompanyDTO();
                companyDTO.Categories = categoriesDTO;

                return companyDTO;
            }
            else if (!string.IsNullOrEmpty(name))
            {
                Company companyDbByName = await _companyRepository.GetByIdOrNameAsync(null, name);
                if (companyDbByName == null)
                    throw new Exception("Contact the support team");

                // Fetch categories for the company (similar to the above process)
                List<Category> categoriesDb = await _categoryRepository.GetCategoriesForCompanyAsync(companyDbByName.Id);
                List<CategoryDTO> categoriesDTO = categoriesDb.Select(x => x.ToCategoryDTO()).ToList();

                // Fetch drinks for each category (similar to the above process)
                foreach (var category in categoriesDb)
                {
                    List<Drink> drinksDb = await _drinkRepository.GetDrinksForCategoryAsync(category.Id);
                    List<DrinkDTO> drinksDTO = drinksDb.Select(d => d.ToDrinkDTO()).ToList();
                    categoriesDTO.First(x => x.Id == category.Id).Drinks = drinksDTO;
                }

                // Map company to DTO (similar to the above process)
                CompanyDTO companyDTO = companyDbByName.ToCompanyDTO();
                companyDTO.Categories = categoriesDTO;

                return companyDTO;
            }
            else
            {
                throw new ArgumentException("Both id and name cannot be null or empty.");
            }
        }

        public async Task CreateCompanyAsync(CreateCompanyDTO createCompanyDTO)
        {
            Company companyDb = createCompanyDTO.ToCompany();
            await _companyRepository.CreateAsync(companyDb);
        }
        public async Task EditCompanyAsync(EditCompanyDTO editCompanyDTO)
        {
            Company companyDb = await _companyRepository.GetByIdOrNameAsync(editCompanyDTO.Id, null);

            if (companyDb == null)
                throw new Exception("The company can not be found!");

            companyDb.Name = editCompanyDTO.Name;
            companyDb.Email = editCompanyDTO.Email;
            companyDb.Password = editCompanyDTO.Password;
            companyDb.HeaderImage = editCompanyDTO.HeaderImage;
            companyDb.CompanyLogo = editCompanyDTO.CompanyLogo;

            await _companyRepository.UpdateAsync(companyDb);
        }

        public async Task EditColorsAsync(EditColorsDTO editColorsDTO)
        {
            Company companyDb = await _companyRepository.GetByIdOrNameAsync(editColorsDTO.Id, null);

            if (companyDb == null)
                throw new Exception("The company can not be found!");

            companyDb.HeaderTextColor = editColorsDTO.HeaderTextColor;
            companyDb.CategoryTextTitleColor = editColorsDTO.CategoryTextTitleColor;
            companyDb.CategoryTitleColor = editColorsDTO.CategoryTitleColor;
            companyDb.MenuThemeColor = editColorsDTO.MenuThemeColor;

            await _companyRepository.UpdateAsync(companyDb);
        }
        public async Task DeleteCompanyAsync(int id)
        {
            await _companyRepository.DeleteAsync(id);
        }
    }
}
