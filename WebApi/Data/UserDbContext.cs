using Microsoft.EntityFrameworkCore;
using WebApi.Entities;

namespace WebApi.Data
{
    public class UserDbContext(DbContextOptions<UserDbContext> options) : DbContext(options)
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Address> Addresses { get; set; }
    }
}
