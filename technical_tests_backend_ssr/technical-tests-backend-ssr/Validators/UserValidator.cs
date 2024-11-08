using FluentValidation;

namespace technical_tests_backend_ssr.Validators
{


    public class UserValidator : AbstractValidator<User>
    {
        public UserValidator()
        {
            RuleFor(x => x.Nombre).NotEmpty().WithMessage("El nombre es requerido.");
            RuleFor(x => x.Apellido).NotEmpty().WithMessage("El apellido es requerido.");
            RuleFor(x => x.DNI).NotEmpty().Matches(@"^\d{8}$").WithMessage("El DNI debe tener 8 dígitos numéricos.");
            RuleFor(x => x.Rol).NotEmpty().WithMessage("El rol es requerido.")
                               .Must(r => r == "Empleado" || r == "Administrador" || r == "Encargado")
                               .WithMessage("El rol debe ser Empleado, Administrador o Encargado.");
            RuleFor(x => x.Usuario).NotEmpty().WithMessage("El nombre de usuario es requerido."); 
            RuleFor(x => x.Contrasenia).NotEmpty().MinimumLength(6).WithMessage("La contraseña debe tener al menos 6 caracteres."); 
        }
    }

}
