namespace BogdanskoQRWebApi.Services.Interfaces
{
    using BogdanskoQRWebApi.DTOs.CategoryDTOs;
    public interface ICategoryService
    {
        Task<List<CategoryDTO>> GetAllCategoriesAsync();
        Task<CategoryDTO> GetCategoryByIdOrNameAsync(int? id, string? name);
        Task CreateCategoryAsync(CreateCategoryDTO createCategoryDTO);
        Task EditCategoryAsync(EditCategoryDTO editCategoryDTO);
        Task DeleteCategoryAsync(int id);
    }
}
