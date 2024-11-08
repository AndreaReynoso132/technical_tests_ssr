import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../states/auth.actions';
import { AuthState } from '../../states/auth.reducer';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  authState$: Observable<AuthState>;
  errorMessage: string | null = null;


  constructor(
    private fb: FormBuilder,
    private store: Store<{ auth: AuthState }>,
    private router: Router
  ) {
    this.authState$ = this.store.select('auth'); 
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      usuario: ['', [Validators.required]],
      contrasenia: ['', [Validators.required]]
    });

    this.authState$.subscribe((authState) => {
      if (authState.user) {
        this.router.navigate(['/list']);
      } else if (authState.error) {
        this.errorMessage = authState.error;
      }
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { usuario, contrasenia } = this.loginForm.value;
      this.store.dispatch(AuthActions.login({ usuario, contrasenia }));
      this.errorMessage = null;
    }
  }
}
