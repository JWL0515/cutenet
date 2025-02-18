using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.Dtos;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public static UserDto user = new();
        [HttpPost("login")]
        public ActionResult<UserDto> Login(LoginDto loginDto)
        {
            user.Email = loginDto.Email;
            user.Token = 
        }
    }
}
