namespace BogdanciQRWebApi.App.Controllers
{
    using BogdanskoQRWebApi.DTOs.CategoryDTOs;
    using BogdanskoQRWebApi.DTOs.CompanyDTOs;
    using BogdanskoQRWebApi.Services.Implementations;
    using BogdanskoQRWebApi.Services.Interfaces;
    using Microsoft.AspNetCore.Mvc;

    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService _categoryService)
        {
            this._categoryService = _categoryService;
        }

        [HttpGet]
        public async Task<ActionResult<List<CategoryDTO>>> GetAll()
        {
            try
            {
                return Ok(await _categoryService.GetAllCategoriesAsync());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Please contact the support team");
            }
        }

        [HttpGet("{identifier}")]
        public async Task<ActionResult<CategoryDTO>> GetCategory(string identifier)
        {
            try
            {
                if (string.IsNullOrEmpty(identifier))
                    return BadRequest("Identifier cannot be null or empty");

                if (int.TryParse(identifier, out int id))
                {
                    if (id < 0)
                        return BadRequest("Invalid input for id");

                    CategoryDTO categoryDTOById = await _categoryService.GetCategoryByIdOrNameAsync(id, null);

                    if (categoryDTOById == null)
                        return NotFound($"Category with id:{id} not found");

                    return Ok(categoryDTOById);
                }
                else
                {
                    CategoryDTO categoryDTOByName = await _categoryService.GetCategoryByIdOrNameAsync(null, identifier);

                    if (categoryDTOByName == null)
                        return NotFound($"Category with name:{identifier} not found");

                    return Ok(categoryDTOByName);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Please contact the support team");
            }
        }

        [HttpPost]
        public async Task<ActionResult> CreateCategory([FromBody] CreateCategoryDTO createCategoryDTO)
        {
            try
            {
                if (createCategoryDTO == null)
                    return BadRequest("The category can not be null!");

                if (string.IsNullOrEmpty(createCategoryDTO.Name) || string.IsNullOrEmpty(createCategoryDTO.BackgroundImage) || createCategoryDTO.CompanyId == 0)
                    return BadRequest("You need to enter all of the parameters");

                await _categoryService.CreateCategoryAsync(createCategoryDTO);

                return StatusCode(StatusCodes.Status201Created, createCategoryDTO);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Please contact the support team");

            }
        }

        [HttpPatch()]
        public async Task<IActionResult> EditCategory([FromBody] EditCategoryDTO editCategoryDTO)
        {
            try
            {
                if (editCategoryDTO == null)
                    return BadRequest("Invalid input");

                if (editCategoryDTO.Id <= 0)
                    return BadRequest("Invalid Id.Please try again");

                await _categoryService.EditCategoryAsync(editCategoryDTO);

                return Ok(editCategoryDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Please contact the support team");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            try
            {
                if (id <= 0)
                    return BadRequest("Invalid input for id");

                CategoryDTO categoryDTO = await _categoryService.GetCategoryByIdOrNameAsync(id, null);

                if (categoryDTO == null)
                    return NotFound("Category not found!");

                await _categoryService.DeleteCategoryAsync(categoryDTO.Id);

                return Ok("Deleted successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Please contact the support team");
            }
        }
    }
}
