using System.ComponentModel.DataAnnotations;

namespace technical_tests_backend_ssr.DTOs
{
    public class LoginDto
    {
        [Required]
        public string? Usuario { get; set; }

        [Required]
        public string? Contrasenia { get; set; }
    }

}
