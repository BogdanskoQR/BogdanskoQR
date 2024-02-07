using BogdanskoQRWebApi.DTOs.DrinkDTOs;

namespace BogdanskoQRWebApi.DTOs.CategoryDTOs
{
    public class CategoryDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string BackgroundImage { get; set; } = string.Empty;

        public static implicit operator CategoryDTO(DrinkDTO v)
        {
            throw new NotImplementedException();
        }
    }
}
