using Business_Layer.Data_Logic;
using Data_Access_Layer.DTO;
using Data_Access_Layer.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Presentation_Layer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserLogic _userService;

        public UserController(IUserLogic userService)
        {
            _userService = userService ?? throw new ArgumentNullException(nameof(userService));
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserDTO userDto)
        {
            try
            {
                var user = await _userService.AuthenticateAsync(userDto);

                if (user == null)
                {
                    return Unauthorized("Invalid email or password.");
                }

                // Return user details (excluding password) as JSON
                return Ok(user);
            }
            catch (Exception ex)
            {
                // Handle exceptions and return appropriate responses
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("GetUserDetailById/{id}")]
        public ActionResult<User> GetUserDetailById(int id)
        {
            try
            {
                var userDetails = _userService.GetUserDetailsById(id);

                if (userDetails == null)
                {
                    return NotFound();
                }

                return Ok(userDetails);
            }
            catch (Exception ex)
            {
                // Handle exceptions and return appropriate responses
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
