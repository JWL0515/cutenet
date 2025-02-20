﻿namespace WebApi.Entities
{
    public class User
    {
        public Guid Id { get; set; } 
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public Address Address { get; set; } = null!;
        public int AddressId { get; set; }
    }
}
