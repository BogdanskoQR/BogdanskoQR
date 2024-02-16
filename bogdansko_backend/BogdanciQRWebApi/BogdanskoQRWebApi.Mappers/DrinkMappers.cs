namespace BogdanskoQRWebApi.Mappers
{
    using BogdanskoQRWebApi.Domain.Models;
    using BogdanskoQRWebApi.DTOs.DrinkDTOs;
    public static class DrinkMappers
    {
        public static DrinkDTO ToDrinkDTO(this Drink drink)
        {
            return new DrinkDTO()
            {
                Id = drink.Id,
                CategoryId = drink.CategoryId,
                Description = drink.Description,
                Image = drink.Image,
                Name = drink.Name,
                Price = drink.Price,
            };
        }

        public static Drink ToDrink(this CreateDrinkDTO createDrinkDTO)
        {
            return new Drink()
            {
                Price = createDrinkDTO.Price,
                CategoryId = createDrinkDTO.CategoryId,
                Description = createDrinkDTO.Description,
                Image = createDrinkDTO.Image,
                Name = createDrinkDTO.Name
            };
        }
    }

}
