import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';


interface LoginData {
  usuario: string;
  contrasenia: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7068/api/Auth/login';

  constructor(private http: HttpClient, private router: Router) {}

  login(data: LoginData): Observable<any> {
    return this.http.post<any>(this.apiUrl, data).pipe(
      tap((response) => {
        localStorage.setItem('userName', response.usuario);
        localStorage.setItem('isLoggedIn', 'true'); 
      })
    );
  }

  getUserName(): string | undefined {
    return localStorage.getItem('userName') || undefined;
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  logout(): void {
    localStorage.removeItem('userName');
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']); 

  }
}
