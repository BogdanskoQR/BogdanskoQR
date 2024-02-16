namespace BogdanskoQRWebApi.DTOs.CompanyDTOs
{
    public class EditColorsDTO
    {
        public int Id { get; set; }
        public string MenuThemeColor { get; set; } = string.Empty;
        public string CategoryTitleColor { get; set; } = string.Empty;
        public string CategoryTextTitleColor { get; set; } = string.Empty;
        public string HeaderTextColor { get; set; } = string.Empty;
    }
}
