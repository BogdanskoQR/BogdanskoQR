namespace BogdanskoQRWebApi.DTOs.CompanyDTOs
{
    public class CreateCompanyDTO
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string MenuThemeColor { get; set; } = string.Empty;
        public string CategoryTitleColor { get; set; } = string.Empty;
        public string CategoryTextTitleColor { get; set; } = string.Empty;
        public string HeaderTextColor { get; set; } = string.Empty;
        public string HeaderImage { get; set; } = string.Empty;
        public string CompanyLogo { get; set; } = string.Empty;
    }
}
