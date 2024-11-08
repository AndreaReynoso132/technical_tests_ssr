Proyecto de Gestión de Usuarios
Este repositorio contiene el desarrollo de un sistema de gestión de usuarios (ABM) y un Login, incluyendo un frontend en Angular y un backend en .NET Core.

Contenido del Repositorio
Frontend - Implementado en Angular, utilizando PrimeNG y NGRX.
Backend - Implementado en .NET Core con Entity Framework Core para la interacción con la base de datos MySQL.

1. Frontend: Angular
Estructura y Tecnologías Utilizadas
Framework: Angular
Componentes de UI: PrimeNG
Gestión de Estado: NGRX
Manejo de Formularios: Formularios Reactivos (Reactive Forms)

a. Funcionalidades 
Login: Formulario de inicio de sesión que permite la autenticación del usuario.
CRUD de Usuarios: Interfaz para crear, editar, eliminar y listar usuarios con filtros y opciones de búsqueda.
Protección de Rutas: Las rutas protegidas redirigen a los usuarios no autenticados al formulario de login.
Estado Global con NGRX: Manejo del estado global de la aplicación, incluyendo las acciones, reducers, y efectos.
Descarga CSV: Función para exportar los datos de usuario mostrados en la tabla a un archivo CSV.
Estructura de Carpetas
src/app: Carpeta principal con los módulos, componentes, y servicios del frontend.
pages: Contiene las páginas como login y list.
components: Incluye componentes reutilizables como modales de creación, edición y eliminación.
states: Carpeta donde se configuran NGRX (actions, reducers, effects).

b.Mejoras
Segun el rol habilitar funcionalidades
Dashborard para visualizar datos de interes
Mejora en la estructura de las carpetas

2. Backend: .NET Core
Estructura y Tecnologías Utilizadas
Framework: .NET Core
ORM: Entity Framework Core
Automapper: Para mapeo entre entidades y DTOs
Inyección de Dependencias: Configurada para servicios y repositorios.
MySQL: Base de datos gestionada por XAMPP (o DBeaver para acceso visual opcional).
Autenticación: Login con almacenamiento de estado en el frontend mediante localStorage.

a.Funcionalidades Clave
Autenticación: Servicio de autenticación que valida credenciales y utiliza hashing seguro para contraseñas.
CRUD de Usuarios: Endpoints para operaciones CRUD en los usuarios.
Inyección de Dependencias: Servicios y repositorios.
Automapper: Para el mapeo entre entidades y DTOs, asegurando que solo los datos necesarios se expongan al frontend.
Validaciones: FluentValidation y Fluent API utilizadas para validar campos, relaciones, y restricciones en la base de datos.

b. Estructura de Carpetas
Controllers: Contiene los controladores para las operaciones de autenticación y usuarios.
Services: Lógica de negocio principal y autenticación.
Repositories: Patrón Repository para interactuar con la base de datos.
DTOs: Objetos de transferencia de datos utilizados en la API.
Validators: Validaciones con FluentValidation para garantizar la integridad de los datos.

c.Mejoras
Me hubiese gustador poder implementar un JWT, debido a que es un aspecto basi de seguridad. 


