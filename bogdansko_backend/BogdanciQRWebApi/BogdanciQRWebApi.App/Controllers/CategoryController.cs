namespace BogdanciQRWebApi.App.Controllers
{
    using BogdanskoQRWebApi.DTOs.CategoryDTOs;
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

        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryDTO>> GetCategory(int id)
        {
            try
            {
                if (id < 0)
                    return BadRequest("Invalid input for id");

                CategoryDTO categoryDTO = await _categoryService.GetCategoryByIdAsync(id);

                if (categoryDTO == null)
                    return NotFound($"Category with id:{id} not found");

                return Ok(categoryDTO);
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

                CategoryDTO categoryDTO = await _categoryService.GetCategoryByIdAsync(id);

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
