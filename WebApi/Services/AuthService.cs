using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using WebApi.Data;
using WebApi.Entities;
using WebApi.Interfaces;
using WebApi.Models;

namespace WebApi.Services
{
    public class AuthService(AppUserDbContext context) :IAuthService
    {
        public async Task<AppUser?> RegisterAsync(UserDto request)
        {
            if (await context.Users.AnyAsync(u => u.Email == request.Email))
            {
                return null;
            }

            var user = new AppUser();
            var hashedPassword = new PasswordHasher<AppUser>().HashPassword(user, request.Password);
            user.Email = request.Email;
            user.PasswordHash = hashedPassword;

            context.Users.Add(user);
            await context.SaveChangesAsync();

            return user;
        }

        public async Task<string?> LoginAsync(UserDto request)
        {
            var user = await context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (user is null) return null;
            if (new PasswordHasher<AppUser>().VerifyHashedPassword(user, user.PasswordHash, request.Password) == PasswordVerificationResult.Failed) return null;
            var token = GenerateToken(user);
            return token;
        }

        private string GenerateToken(AppUser user)
        {
            // 1.step: prepare tokenHandler, credential, claims
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = "replaceThisLaterForMoreSecurityShouldbeOver256bits"u8.ToArray();
            var securityKey = new SymmetricSecurityKey(key);
            var credential = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);
            var claims = new List<Claim>
            {
                //new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()), // help for validation (like backlist)
                //new(JwtRegisteredClaimNames.Sub, userId.ToString()),
                new(JwtRegisteredClaimNames.Email, user.Email),
            };
            // 2.step: prepare tokenDescriptor
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(240),
                Issuer = "JWL",
                SigningCredentials = credential
            };
            // 3.step: create token
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
