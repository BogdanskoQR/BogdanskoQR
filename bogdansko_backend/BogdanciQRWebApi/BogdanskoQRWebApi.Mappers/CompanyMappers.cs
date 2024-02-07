    namespace BogdanskoQRWebApi.Mappers
{
    using BogdanskoQRWebApi.Domain.Models;
    using BogdanskoQRWebApi.DTOs.CompanyDTOs;
    public static class CompanyMappers
    {
        public static CompanyDTO ToCompanyDTO(this Company company)
        {
            return new CompanyDTO()
            {
                Id = company.Id,
                Email = company.Email,
                Password = company.Password,
                CategoryTextTitleColor = company.CategoryTextTitleColor,
                CategoryTitleColor = company.CategoryTitleColor,
                HeaderImage = company.HeaderImage,
                HeaderTextColor = company.HeaderTextColor,
                CompanyLogo = company.CompanyLogo,
                Name = company.Name,
                MenuThemeColor = company.MenuThemeColor
            };
        }

        public static Company ToCompany(this CreateCompanyDTO createCompanyDTO)
        {
            return new Company()
            {
                Email = createCompanyDTO.Email,
                Password = createCompanyDTO.Password,
                CategoryTextTitleColor = createCompanyDTO.CategoryTextTitleColor,
                CategoryTitleColor = createCompanyDTO.CategoryTitleColor,
                HeaderImage = createCompanyDTO.HeaderImage,
                HeaderTextColor = createCompanyDTO.HeaderTextColor,
                CompanyLogo = createCompanyDTO.CompanyLogo,
                MenuThemeColor = createCompanyDTO.MenuThemeColor,
                Name = createCompanyDTO.Name
            };
        }
    }
}
