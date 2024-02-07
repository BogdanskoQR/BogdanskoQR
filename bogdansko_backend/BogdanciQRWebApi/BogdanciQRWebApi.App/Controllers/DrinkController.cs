namespace BogdanciQRWebApi.App.Controllers
{
    using BogdanskoQRWebApi.DTOs.CategoryDTOs;
    using BogdanskoQRWebApi.DTOs.DrinkDTOs;
    using BogdanskoQRWebApi.Services.Implementations;
    using BogdanskoQRWebApi.Services.Interfaces;
    using Microsoft.AspNetCore.Mvc;

    [Route("api/[controller]")]
    [ApiController]
    public class DrinkController : ControllerBase
    {
        private readonly IDrinkService _drinkService;

        public DrinkController(IDrinkService _drinkService)
        {
            this._drinkService = _drinkService;
        }

        [HttpGet]
        public async Task<ActionResult<List<DrinkDTO>>> GetAll()
        {
            try
            {
                return Ok(await _drinkService.GetAllDrinksAsync());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Please contact the support team");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DrinkDTO>> GetDrink(int id)
        {
            try
            {
                if (id < 0)
                    return BadRequest("Invalid input for id");

                DrinkDTO drinkDTO = await _drinkService.GetDrinkByIdAsync(id);

                if (drinkDTO == null)
                    return NotFound($"Drink with id:{id} not found");

                return Ok(drinkDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Please contact the support team");
            }
        }

        [HttpPost]
        public async Task<ActionResult> CreateDrink([FromBody] CreateDrinkDTO createDrinkDTO)
        {
            try
            {
                if (createDrinkDTO == null)
                    return BadRequest("The category can not be null!");

                if(string.IsNullOrEmpty(createDrinkDTO.Name) || createDrinkDTO.Price == 0 || 
                    createDrinkDTO.CategoryId == 0 )
                    return BadRequest("You need to enter all of the parameters");

                await _drinkService.CreateDrinkAsync(createDrinkDTO);

                return StatusCode(StatusCodes.Status201Created, createDrinkDTO);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Please contact the support team");
            }
        }

        [HttpPatch()]
        public async Task<IActionResult> EditDrink([FromBody] EditDrinkDTO editDrinkDTO)
        {
            try
            {
                if (editDrinkDTO == null)
                    return BadRequest("Invalid input");

                if (editDrinkDTO.Id <= 0)
                    return BadRequest("Invalid Id.Please try again");

                await _drinkService.EditDrinkAsync(editDrinkDTO);

                return Ok(editDrinkDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Please contact the support team");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDrink(int id)
        {
            try
            {
                if (id <= 0)
                    return BadRequest("Invalid input for id");

                DrinkDTO drinkDTO = await _drinkService.GetDrinkByIdAsync(id);

                if (drinkDTO == null)
                    return NotFound("Drink not found!");

                await _drinkService.DeleteDrinkAsync(drinkDTO.Id);

                return Ok("Deleted successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Please contact the support team");
            }
        }
    }
}
