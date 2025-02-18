using WebApi.Entities;

namespace WebApi.Interfaces
{
    public interface IAuthService
    {
        string GenerateToken(User user);
    }
}
