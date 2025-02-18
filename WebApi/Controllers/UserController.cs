using Core.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebApi.Dtos;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public static UserDto userDto = new();
        private readonly ITokenService _tokenService;

        public UserController(ITokenService tokenService)
        {
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public ActionResult<UserDto> Register(RegisterDto registerDto)
        {
            var hashedPassword = new PasswordHasher<UserDto>().HashPassword(userDto, registerDto.Password);
            userDto.Email = registerDto.Email;
            userDto.PasswordHash = hashedPassword;

            return Ok(userDto);
        }

        [HttpPost("login")]
        public ActionResult<string> Login(LoginDto loginDto)
        {
            if (userDto.Email != loginDto.Email) return BadRequest("User not found");
            if (new PasswordHasher<UserDto>().VerifyHashedPassword(userDto, userDto.PasswordHash, loginDto.Password) == PasswordVerificationResult.Failed) return BadRequest("Wrong password");

            var token = _tokenService.GenerateToken("testing");
            return Ok(token);
        }
    }
}
