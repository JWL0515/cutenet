using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Entities;
using WebApi.Interfaces;
using WebApi.Models;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController(IAuthService authService, UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, AppUserDbContext context) : ControllerBase
    {
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> RegisterAsync(RegisterDto request)
        {
            if (await context.Users.AnyAsync(u => u.Email == request.Email))
            {
                return null;
            }

            var user = new AppUser {
                Email = request.Email,
                // Username is required
                UserName = request.Email
            };
            // Password will be automatic hashed
            var result = await userManager.CreateAsync(user, request.Password);

            if (!result.Succeeded) return BadRequest();

            return new UserDto
            {
                Email = user.Email,
                Token = authService.GenerateToken(user)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> LoginAsync(LoginDto request)
        {
            var result = await authService.LoginAsync(request);
            if (result is null)
                return BadRequest("Invalid username or password.");

            return Ok("success");
        }

        [HttpGet("test")]
        public string Get()
        {
            return "Working";
        }

        [HttpPut("address")]
        public async Task<ActionResult<string>> AddressAsync(AddressDto request)
        {
            //var result = await authService.LoginAsync(request);
            //if (result is null)
            //    return BadRequest("Invalid username or password.");

            return Ok("success");
        }

    }
}
