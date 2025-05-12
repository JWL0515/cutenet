using AutoMapper;
using WebApi.Dtos;
using WebApi.Entities;
using WebApi.Models;

namespace WebApi.Helpers
{
    public class MapperProfiles : Profile
    {
        public MapperProfiles()
        {
            CreateMap<AddressDto, Address>();
            CreateMap<ProductDto, Product>()
                .ForMember(d => d.Brand, o => o.MapFrom(s => s.Brand.Name))
                .ForMember(d => d.Category, o => o.MapFrom(s => s.Category.Name));
        }
    }
}
