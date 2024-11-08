import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Auth] Login',
  props<{ usuario: string; contrasenia: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: any }>()  
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: any }>()
);
