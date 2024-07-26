using Business_Layer.Data_Logic;
using Data_Access_Layer.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Presentation_Layer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAdminLogin _userService;

        public AdminController(IAdminLogin userService)
        {
            _userService = userService ?? throw new ArgumentNullException(nameof(userService));
        }

        [HttpPost("adminlogin")]
        public async Task<IActionResult> AdminLogin(AdminDTO userDto)
        {
            try
            {
                var user = await _userService.AuthenticateAsync(userDto);

                if (user == null)
                {
                    return Unauthorized("Invalid email or password.");
                }

                // Generate a token or perform any other required actions for successful login

                return Ok("Login successful."); // Return a token or user details here
            }
            catch (Exception ex)
            {
                // Handle exceptions and return appropriate responses
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
