using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using WebApi.Entities;
using WebApi.Interfaces;

namespace WebApi.Services
{
    public class AuthService :IAuthService
    {
        public string GenerateToken(User user)
        {
            // 1.step: prepare tokenHandler, credential, claims
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = "replaceThisLaterForMoreSecurity"u8.ToArray();
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
