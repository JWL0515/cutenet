using AutoMapper;
using WebApi.Entities;
using WebApi.Models;

namespace WebApi.Helpers
{
    public class MapperProfiles : Profile
    {
        public MapperProfiles()
        {
            CreateMap<AddressDto, Address>();
        }
    }
}
