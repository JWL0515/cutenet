﻿namespace WebApi.Dtos
{
    public class UserDto
    {
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string Token { get; set; }
    }
}
