using AutoMapper;
using technical_tests_backend_ssr.DTOs;

namespace technical_tests_backend_ssr.Mapping
{

    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<CreateUserDto, User>();

            CreateMap<UpdateUserDto, User>();

            CreateMap<User, UpdateUserDto>();
            CreateMap<User, CreateUserDto>();
        }
    }

}
