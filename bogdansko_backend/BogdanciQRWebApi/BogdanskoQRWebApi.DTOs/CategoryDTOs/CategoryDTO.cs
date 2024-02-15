namespace BogdanskoQRWebApi.DTOs.CategoryDTOs
{
    using BogdanskoQRWebApi.DTOs.DrinkDTOs;

    public class CategoryDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string BackgroundImage { get; set; } = string.Empty;
        public string? View { get; set; } = string.Empty;
        public List<DrinkDTO> Drinks { get; set; }
    }
}
