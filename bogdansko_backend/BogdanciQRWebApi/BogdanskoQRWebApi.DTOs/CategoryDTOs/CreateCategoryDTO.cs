namespace BogdanskoQRWebApi.DTOs.CategoryDTOs
{
    public class CreateCategoryDTO
    {
        public int CompanyId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string BackgroundImage { get; set; } = string.Empty;
    }
}
