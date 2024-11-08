namespace technical_tests_backend_ssr.DTOs
{
    public class CreateUserDto
    {
        public string? Nombre { get; set; }
        public string? Apellido { get; set; }
        public string? DNI { get; set; }
        public string? Rol { get; set; }
        public string? Usuario { get; set; } 
        public string? Contrasenia { get; set; } 


    }
}

namespace technical_tests_backend_ssr.DTOs
{
    public class UpdateUserDto
    {
        public int Id { get; set; }  
        public string? Nombre { get; set; }
        public string? Apellido { get; set; }
        public string? DNI { get; set; }
        public string? Rol { get; set; }
        public string? Usuario { get; set; }
        public string? Contrasenia { get; set; }
    }
}