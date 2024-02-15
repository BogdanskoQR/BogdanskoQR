namespace BogdanskoQRWebApi.DTOs.CompanyDTOs
{
    public class EditCompanyDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string HeaderImage { get; set; } = string.Empty;
        public string CompanyLogo { get; set;} = string.Empty;
    }
}
