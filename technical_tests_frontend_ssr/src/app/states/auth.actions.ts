import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Auth] Login',
  props<{ usuario: string; contrasenia: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: any }>()  // Ajusta el tipo de datos según sea necesario
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: any }>()
);
