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
    public class AuthService : IAuthService
    {
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
