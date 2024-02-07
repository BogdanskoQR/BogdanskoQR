namespace BogdanskoQRWebApi.DTOs.CategoryDTOs
{
    public class EditCategoryDTO
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string BackgroundImage { get; set; } = string.Empty;
    }
}
