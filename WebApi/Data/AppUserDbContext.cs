using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WebApi.Entities;

namespace WebApi.Data
{
    public class AppUserDbContext(DbContextOptions<AppUserDbContext> options) : IdentityDbContext<AppUser>(options)
    {
    }
}
