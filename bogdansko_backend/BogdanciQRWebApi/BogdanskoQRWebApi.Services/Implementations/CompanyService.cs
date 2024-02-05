namespace BogdanskoQRWebApi.Services.Implementations
{
    using BogdanskoQRWebApi.DataAccess.Repositories.Interfaces;
    using BogdanskoQRWebApi.Domain.Models;
    using BogdanskoQRWebApi.DTOs.CompanyDTOs;
    using BogdanskoQRWebApi.Services.Interfaces;
    using BogdanskoQRWebApi.Mappers;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public class CompanyService : ICompanyService
    {
        private readonly ICompanyRepository _companyRepository;

        public CompanyService(ICompanyRepository _companyRepository)
        {
            this._companyRepository = _companyRepository;
        }
        public async Task<List<CompanyDTO>> GetAllCompaniesAsync()
        {
            List<Company> companyDb = await _companyRepository.GetAllAsync();

            if (companyDb == null)
                throw new Exception("Contant the support team");

            return companyDb.Select(x => x.ToCompanyDTO()).ToList();

        }
        public async Task<CompanyDTO> GetCompanyByIdAsync(int id)
        {
            Company companyDb = await _companyRepository.GetByIdAsync(id);

            if (companyDb == null)
                throw new Exception("Contact the support team");

            return companyDb.ToCompanyDTO();
        }
        public async Task CreateCompanyAsync(CreateCompanyDTO createCompanyDTO)
        {
            Company companyDb = createCompanyDTO.ToCompany();
            await _companyRepository.CreateAsync(companyDb);
        }
        public async Task EditCompanyAsync(EditCompanyDTO editCompanyDTO)
        {
            Company companyDb = await _companyRepository.GetByIdAsync(editCompanyDTO.Id);

            if (companyDb == null)
                throw new Exception("The company can not be found!");

            companyDb.Email = editCompanyDTO.Email;
            companyDb.Password = editCompanyDTO.Password;
            companyDb.CategoryTextTitleColor = editCompanyDTO.CategoryTextTitleColor;
            companyDb.HeaderTextColor = editCompanyDTO.HeaderTextColor;
            companyDb.CategoryTitleColor = editCompanyDTO.CategoryTitleColor;
            companyDb.HeaderImage = editCompanyDTO.HeaderImage;
            companyDb.CompanyLogo = editCompanyDTO.CompanyLogo;
            companyDb.MenuThemeColor = editCompanyDTO.MenuThemeColor;
            companyDb.Name = editCompanyDTO.Name;

            await _companyRepository.UpdateAsync(companyDb);
        }
        public async Task DeleteCompanyAsync(int id)
        {
            await _companyRepository.DeleteAsync(id);
        }
    }
}
