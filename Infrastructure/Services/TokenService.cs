using Core.Interfaces;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;


namespace Infrastructure.Services
{
    public class TokenService : ITokenService
    {  
        public string GenerateToken(string email)
        {
            // 1.step: prepare tokenHandler, credential, claims
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = "replaceThisLaterForMoreSecurity"u8.ToArray();
            var securityKey = new SymmetricSecurityKey(key);
            var credential = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);
            var claims = new List<Claim>
            {
                new(JwtRegisteredClaimNames.Email, email),
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
