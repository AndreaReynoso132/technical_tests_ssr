# Documentación de la Base de Datos - `technical_tests_database_ssr`

## Descripción
Esta base de datos almacena la información de los usuarios del sistema para el proyecto `technical_tests_ssr`, con roles y autenticación. La estructura incluye una tabla de usuarios (`Users`) que contiene los datos personales y credenciales de cada usuario.

## Estructura de la Base de Datos

### Tabla: Users
| Columna      | Tipo            | Restricciones            | Descripción                                     |
|--------------|-----------------|--------------------------|-------------------------------------------------|
| Id           | INT             | PRIMARY KEY, AUTO_INCREMENT | Identificador único de usuario.             |
| Nombre       | VARCHAR(50)     | NOT NULL                 | Nombre del usuario.                              |
| Apellido     | VARCHAR(50)     | NOT NULL                 | Apellido del usuario.                            |
| DNI          | VARCHAR(8)      | NOT NULL, UNIQUE         | Documento de Identidad (DNI), debe ser único.    |
| Rol          | ENUM('Empleado', 'Administrador', 'Encargado') | NOT NULL | Rol del usuario en el sistema (Empleado, Administrador o Encargado). |
| Usuario      | VARCHAR(50)     | NOT NULL, UNIQUE         | Nombre de usuario, debe ser único en el sistema. |
| Contrasenia  | VARCHAR(255)    | NOT NULL                 | Contraseña del usuario, almacenada como hash en un entorno seguro. |

## Notas sobre la Seguridad de las Contraseñas
- **Contraseñas Hasheadas**: En un entorno de "producción", el campo `Contrasenia` debe almacenar contraseñas en formato hasheado (usando bcrypt) para proteger la información de acceso.
- **Datos de Prueba**: Los datos de prueba aquí incluidos almacenan contraseñas en texto plano solo para fines de prueba, y poder acceder al sistema por medio del login. Cuando se registren los primeros usuarios desde el formularios se espera que la contraseña se guarde en la base hasheada.
## Instrucciones de Configuración

### Requisitos Previos
- Tener MySQL o un entorno de desarrollo local similar (como XAMPP) en funcionamiento.
- Acceso a un cliente SQL (por ejemplo, DBeaver o MySQL CLI).
- **Usuario de Base de Datos**: El script está configurado para usarse con el usuario `root` sin contraseña. Si tu configuración es diferente, deberás ajustar estos parámetros según sea necesario.

### Ejecución del Script SQL
1. Abre el cliente de base de datos e inicia sesión con un usuario con permisos para crear bases de datos.
2. Ejecuta el script `setup.sql` o usa la línea de comandos para cargarlo:
   ```bash
   mysql -u root -p < setup.sql
3. Verifica que la base de datos technical_tests_database_ssr y la tabla Users se hayan creado correctamente.

### Propuesta de mejoras
1. Se pueden añandir dos columnas mas como fecha_creacion y fecha_actualiziacion,para guardar la fecha de creación y la última actualización de cada registro, lo cual es útil para llevar un seguimiento histórico de la base de datos. Estos campos mejorarian la trazabilidad y el control sobre los cambios de cada registro.
