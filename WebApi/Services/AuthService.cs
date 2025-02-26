using Microsoft.AspNetCore.Http.HttpResults;
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
    public class AuthService(AppUserDbContext context, UserManager<AppUser> userManager, SignInManager<AppUser> signInManager) :IAuthService
    {
        

        public async Task<UserDto?> LoginAsync(LoginDto request)
        {
            var user = await context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (user is null) return null;
            var result = await signInManager.CheckPasswordSignInAsync(user, request.Password, false);
            var token = GenerateToken(user);

            return new UserDto
            {
                Email = user.Email,
                Token = GenerateToken(user)
            };
        }

        public string GenerateToken(AppUser user)
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
