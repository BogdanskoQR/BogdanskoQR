namespace BogdanskoQRWebApi.Mappers
{
    using BogdanskoQRWebApi.Domain.Models;
    using BogdanskoQRWebApi.DTOs.CategoryDTOs;
    public static class CategoryMappers
    {
        public static CategoryDTO ToCategoryDTO(this Category category)
        {
            return new CategoryDTO()
            {
                Id = category.Id,
                BackgroundImage = category.BackgroundImage,
                Name = category.Name,
                View = category.View
            };
        }

        public static Category ToCategory(this CreateCategoryDTO createCategoryDTO)
        {
            return new Category()
            {
                CompanyId = createCategoryDTO.CompanyId,
                BackgroundImage = createCategoryDTO.BackgroundImage,
                Name = createCategoryDTO.Name,
                View = createCategoryDTO.View
            };
        }
    }
}
