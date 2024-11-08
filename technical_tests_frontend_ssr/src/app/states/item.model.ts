export interface Item {
  id: number; 
  usuario: string;
  nombre: string;
  apellido: string;
  dni: string;
  rol: 'Empleado' | 'Administrador' | 'Encargado';
  contrasenia: string;
  [key: string]: any; 
}
