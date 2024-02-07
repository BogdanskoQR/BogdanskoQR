namespace BogdanskoQRWebApi.Services.Implementations
{
    using BogdanskoQRWebApi.DataAccess.Repositories.Interfaces;
    using BogdanskoQRWebApi.Domain.Models;
    using BogdanskoQRWebApi.DTOs.DrinkDTOs;
    using BogdanskoQRWebApi.Mappers;
    using BogdanskoQRWebApi.Services.Interfaces;
    public class DrinkService : IDrinkService
    {
        private readonly IDrinkRepository _drinkRepository;

        public DrinkService(IDrinkRepository _drinkRepository)
        {
            this._drinkRepository = _drinkRepository;
        }
        public async Task<List<DrinkDTO>> GetAllDrinksAsync()
        {
            List<Drink> drinkDb = await _drinkRepository.GetAllAsync();

            if (drinkDb == null)
                throw new Exception("Contact the support team");

            return drinkDb.Select(x => x.ToDrinkDTO()).ToList();
        }
        public async Task<DrinkDTO> GetDrinkByIdAsync(int id)
        {
            Drink drinkDb = await _drinkRepository.GetByIdAsync(id);

            if (drinkDb == null)
                throw new Exception("Contact the support team");

            return drinkDb.ToDrinkDTO();
        }
        public async Task CreateDrinkAsync(CreateDrinkDTO createDrinkDTO)
        {
            Drink drinkDb = createDrinkDTO.ToDrink();
            await _drinkRepository.CreateAsync(drinkDb);
        }
        public async Task EditDrinkAsync(EditDrinkDTO editDrinkDTO)
        {
            Drink drinkDb = await _drinkRepository.GetByIdAsync(editDrinkDTO.Id);

            if (drinkDb == null)
                throw new Exception("The drink can not be found!");

            drinkDb.Name = editDrinkDTO.Name;
            drinkDb.Description = editDrinkDTO.Description;
            drinkDb.CategoryId = editDrinkDTO.CategoryId;
            drinkDb.Price = editDrinkDTO.Price;
            drinkDb.Image = editDrinkDTO.Image;

            await _drinkRepository.UpdateAsync(drinkDb);
        }
        public async Task DeleteDrinkAsync(int id)
        {
            await _drinkRepository.DeleteAsync(id);
        }
    }
}
