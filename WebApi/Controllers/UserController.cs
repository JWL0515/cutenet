﻿using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System.Security.Claims;
using WebApi.Data;
using WebApi.Entities;
using WebApi.Interfaces;
using WebApi.Models;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController(IAuthService authService, UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, AppUserDbContext context,
        IMapper mapper) : ControllerBase
    {
        [HttpGet("test")]
        public async Task<string> Testing()
        {
            return ("Successful");
        }
          
        
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> RegisterAsync(RegisterDto request)
        {
            // TODO: change using context to using UserManager
            // TODO: handle error
            if (await context.Users.AnyAsync(u => u.Email == request.Email))
            {
                return null;
            }

            var user = new AppUser {
                Email = request.Email,
                // Username is required
                UserName = request.Email
            };

            // Password will be automatic hashed
            var result = await userManager.CreateAsync(user, request.Password);

            if (!result.Succeeded) return BadRequest();

            return new UserDto
            {
                Email = user.Email,
                Token = authService.GenerateToken(user)
            };
        }

        
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> LoginAsync(LoginDto request)
        {
            // TODO: change using context to using UserManager
            // TODO: handle error
            var user = await context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);

            if (user is null) return null;
            var result = await signInManager.CheckPasswordSignInAsync(user, request.Password, false);

            if (!result.Succeeded) return BadRequest();

            return new UserDto
            {
                Email = user.Email,
                Token = authService.GenerateToken(user)
            };
        }

        [Authorize]
        [HttpPut("address")]
        public async Task<ActionResult<AddressDto>> UpdateAddressAsync(AddressDto request)
        {
            //var result = await authService.LoginAsync(request);
            //if (result is null)
            //    return BadRequest("Invalid username or password.");
            
            var email = User.FindFirstValue(ClaimTypes.Email);
            var user = await context.Users.Include(x => x.Address).FirstOrDefaultAsync(u => u.Email == email);

            user.Address = mapper.Map<AddressDto, Address>(request);

            var result = await userManager.UpdateAsync(user);

            if (!result.Succeeded) return BadRequest("Problem updating the user");

            return Ok();
        }

    }
}
