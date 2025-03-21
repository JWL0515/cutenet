﻿using System.ComponentModel.DataAnnotations;

namespace WebApi.Entities
{
    public class Address
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Street { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string ZipCode { get; set; } = string.Empty;
        //public string Country { get; set; } = string.Empty;

        // one-to-one relationship
        public required string AppUserId { get; set; }
        public AppUser User { get; set; } = null!;
        
    }
}
