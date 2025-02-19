﻿using WebApi.Entities;
using WebApi.Models;

namespace WebApi.Interfaces
{
    public interface IAuthService
    {
        Task<User?> RegisterAsync(UserDto request);
        Task<string?> LoginAsync(UserDto request);
    }
}
