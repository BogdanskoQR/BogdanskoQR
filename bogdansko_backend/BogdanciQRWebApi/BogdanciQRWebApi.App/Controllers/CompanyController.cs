namespace BogdanciQRWebApi.App.Controllers
{
    using BogdanskoQRWebApi.DTOs.CompanyDTOs;
    using BogdanskoQRWebApi.Services.Interfaces;
    using Microsoft.AspNetCore.Mvc;

    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private readonly ICompanyService _companyService;

        public CompanyController(ICompanyService _companyService)
        {
            this._companyService = _companyService;
        }

        [HttpGet]
        public async Task<ActionResult<List<CompanyDTO>>> GetAll()
        {
            try
            {
                return Ok(await _companyService.GetAllCompaniesAsync());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Please contact the support team");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CompanyDTO>> GetCompany(int id)
        {
            try
            {
                if (id < 0)
                    return BadRequest("Invalid input for id");

                CompanyDTO companyDTO = await _companyService.GetCompanyByIdAsync(id);

                if (companyDTO == null)
                    return NotFound($"Company with id:{id} not found");

                return Ok(companyDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Please contact the support team");
            }
        }

        [HttpPost]
        public async Task<ActionResult> CreateCompany([FromBody] CreateCompanyDTO createCompanyDTO)
        {
            try
            {
                if (createCompanyDTO == null)
                    return BadRequest("The company can not be null");

                if (string.IsNullOrEmpty(createCompanyDTO.Email) || string.IsNullOrEmpty(createCompanyDTO.HeaderTextColor) || string.IsNullOrEmpty(createCompanyDTO.Password) || string.IsNullOrEmpty(createCompanyDTO.HeaderImage)
                  || string.IsNullOrEmpty(createCompanyDTO.CategoryTitleColor) || string.IsNullOrEmpty(createCompanyDTO.CompanyLogo) || string.IsNullOrEmpty(createCompanyDTO.CategoryTextTitleColor))
                       return BadRequest("You need to enter all of the parameters");

                await _companyService.CreateCompanyAsync(createCompanyDTO);

                return StatusCode(StatusCodes.Status201Created, "Company created!");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Please contact the support team");
            }
        }

        [HttpPatch]
        public async Task<IActionResult> EditCompany([FromBody] EditCompanyDTO editCompanyDTO)
        {
            try
            {
                if (editCompanyDTO == null)
                    return BadRequest("Invalid input");

                if (editCompanyDTO.Id <= 0)
                    return BadRequest("Invalid Id.Please try again");

                await _companyService.EditCompanyAsync(editCompanyDTO);

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Please contact the support team");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCompany(int id)
        {
            try
            {
                if (id <= 0)
                    return BadRequest("Invalid input for id");

                CompanyDTO companyDTO = await _companyService.GetCompanyByIdAsync(id);

                if (companyDTO == null)
                    return NotFound("Company not found!");

                await _companyService.DeleteCompanyAsync(companyDTO.Id);

                return Ok("Deleted successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Please contact the support team");
            }
        }
    }
}
