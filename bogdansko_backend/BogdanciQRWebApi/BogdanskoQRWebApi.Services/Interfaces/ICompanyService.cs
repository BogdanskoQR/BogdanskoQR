namespace BogdanskoQRWebApi.Services.Interfaces
{
    using BogdanskoQRWebApi.DTOs.CompanyDTOs;
    public interface ICompanyService
    {
        Task<List<CompanyDTO>> GetAllCompaniesAsync();
        Task<CompanyDTO> GetCompanyByIdAsync(int id);
        Task CreateCompanyAsync(CreateCompanyDTO createCompanyDTO);
        Task EditCompanyAsync(EditCompanyDTO editCompanyDTO);
        Task DeleteCompanyAsync(int id);
    }
}
