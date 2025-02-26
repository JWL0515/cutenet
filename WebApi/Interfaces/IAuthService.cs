using WebApi.Entities;
using WebApi.Models;

namespace WebApi.Interfaces
{
    public interface IAuthService
    {
        Task<AppUser?> RegisterAsync(UserDto request);
        Task<string?> LoginAsync(UserDto request);
    }
}
