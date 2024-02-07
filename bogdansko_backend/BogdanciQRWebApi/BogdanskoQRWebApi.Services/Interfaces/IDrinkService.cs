namespace BogdanskoQRWebApi.Services.Interfaces
{
    using BogdanskoQRWebApi.DTOs.DrinkDTOs;
    public interface IDrinkService
    {
        Task<List<DrinkDTO>> GetAllDrinksAsync();
        Task<DrinkDTO> GetDrinkByIdAsync(int id);
        Task CreateDrinkAsync(CreateDrinkDTO createDrinkDTO);
        Task EditDrinkAsync(EditDrinkDTO editDrinkDTO);
        Task DeleteDrinkAsync(int id);
    }
}
