using WebApi.Entities;
using WebApi.Models;

namespace WebApi.Interfaces
{
    public interface IAuthService
    {
        string GenerateToken(AppUser user);
        Task<UserDto?> LoginAsync(LoginDto request);
    }
}
