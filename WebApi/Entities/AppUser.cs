using Microsoft.AspNetCore.Identity;

namespace WebApi.Entities
{
    public class AppUser : IdentityUser
    {
        public Address? Address { get; set; }
    }
}
