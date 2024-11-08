-- Creación de la base de datos
CREATE DATABASE IF NOT EXISTS technical_tests_database_ssr;
USE technical_tests_database_ssr;

-- Creación de la tabla de usuarios
CREATE TABLE IF NOT EXISTS Users (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL COMMENT 'Nombre del usuario',
    Apellido VARCHAR(50) NOT NULL COMMENT 'Apellido del usuario',
    DNI VARCHAR(8) NOT NULL UNIQUE COMMENT 'DNI del usuario, debe ser único',
    Rol ENUM('Empleado', 'Administrador', 'Encargado') NOT NULL COMMENT 'Rol del usuario en el sistema',
    Usuario VARCHAR(50) NOT NULL UNIQUE COMMENT 'Nombre de usuario, debe ser único',
    Contrasenia VARCHAR(255) NOT NULL COMMENT 'Contraseña hasheada del usuario',
);

-- Inserción de datos de prueba
-- Nota: En un entorno de producción, la columna `Contrasenia` debe almacenar contraseñas hasheadas. Aquí se usan contraseñas en texto plano solo para pruebas iniciales.
INSERT INTO Users (Nombre, Apellido, DNI, Rol, Usuario, Contrasenia) VALUES
('Florencia', 'Rojas', '96969660', 'Empleado', 'Florencia12', 'Florencia12'), -- Cambiar por hash en producción
('Felipe', 'Guzman', '96969696', 'Empleado', 'Felipe12', 'Felipe12');  -- Cambiar por hash en producción
