using AutoMapper;
using technical_tests_backend_ssr.DTOs;

namespace technical_tests_backend_ssr.Mapping
{

    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Mapear de CreateUserDto a User (para creación de usuarios)
            CreateMap<CreateUserDto, User>();

            // Mapear de UpdateUserDto a User (para actualización de usuarios)
            CreateMap<UpdateUserDto, User>();

            // Mapear de User a los DTOs para respuestas (si necesitas devolver datos de usuario en alguna respuesta)
            CreateMap<User, UpdateUserDto>();
            CreateMap<User, CreateUserDto>();
        }
    }

}
