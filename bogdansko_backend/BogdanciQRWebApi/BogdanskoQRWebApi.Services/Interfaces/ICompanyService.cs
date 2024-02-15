namespace BogdanskoQRWebApi.Services.Interfaces
{
    using BogdanskoQRWebApi.DTOs.CompanyDTOs;
    public interface ICompanyService
    {
        Task<List<CompanyDTO>> GetAllCompaniesAsync();
        Task<CompanyDTO> GetCompanyByIdOrNameAsync(int? id, string? name);
        Task CreateCompanyAsync(CreateCompanyDTO createCompanyDTO);
        Task EditCompanyAsync(EditCompanyDTO editCompanyDTO);
        Task EditColorsAsync(EditColorsDTO editColorsDTO);
        Task DeleteCompanyAsync(int id);
    }
}
