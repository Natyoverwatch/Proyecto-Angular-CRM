import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, Subject, catchError, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { UsuarioModel } from '../../core/models/usuario.model';
import { LoginInterfaces } from '../../core/interfaces/login-interfaces';
<<<<<<< HEAD
import Swal from 'sweetalert2';
=======
>>>>>>> db0bf76b35262a94f152f82a251a33d5b088837d

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  private loginEvent = new Subject<void>();
  private logoutEvent = new Subject<void>();
  usuario: UsuarioModel | null;

  constructor(private httpClient: HttpClient, private router: Router) { }

  private get headers() {
    return {
      headers: {
        'x-token-pass': localStorage.getItem('x-token-pass') || '',
      }
    };
  }

  get onLogin(): Subject<void> {
    return this.loginEvent;
  }

  get onLogout(): Subject<void> {
    return this.logoutEvent;
  }

  get token(): string{
    return localStorage.getItem(`token`) || ``;
  }

  validateToken(): Observable<boolean>{
    return this.httpClient.get(`${base_url}/auth`, {
      headers:{
        'x-token': this.token,
      },
    }).pipe(
      map((resp: any)=>{
        const {
          _id,
          nombre,
          email,
<<<<<<< HEAD
          celular,
          direccion,
          tipoDocumento,
          numeroDocumento,
=======
          telefono,
          direccion,
          tDocumento,
          nDocumento,
>>>>>>> db0bf76b35262a94f152f82a251a33d5b088837d
          login,
          password,
          rol,
          estado,
          createdAt,
          updatedAt
        } = resp.usuario;
  
        this.usuario = new UsuarioModel(
          nombre,
          email,
<<<<<<< HEAD
          celular,
          direccion,
          tipoDocumento,
          numeroDocumento,
=======
          telefono,
          direccion,
          tDocumento,
          nDocumento,
>>>>>>> db0bf76b35262a94f152f82a251a33d5b088837d
          login,
          password,
          rol,
          estado,
          createdAt,
          updatedAt,
          _id,
        );
        this.usuario.direccion = '';
<<<<<<< HEAD
        this.usuario.celular = 0;
        this.usuario.tipoDocumento = '';
        this.usuario.password = '';
        this.usuario.numeroDocumento = '';
=======
        this.usuario.telefono = '';
        this.usuario.tDocumento = '';
        this.usuario.password = '';
        this.usuario.nDocumento = '';
>>>>>>> db0bf76b35262a94f152f82a251a33d5b088837d
        localStorage.setItem('usuario', JSON.stringify(this.usuario));
        localStorage.setItem('token', resp.token);
        return true;
      }),
      catchError((error) => {
        console.error(error);
        return of(false);
      })
    );
  }
  
  login(login: LoginInterfaces) {
    return this.httpClient.post(`${base_url}/auth`, login).pipe(
      tap((resp: any) => {
        localStorage.setItem(`token`, resp.token);
        this.validateToken().subscribe(() => {
          this.loginEvent.next();
        });
      })
    );
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.logoutEvent.next();
    this.router.navigateByUrl('');
  }

<<<<<<< HEAD
  private tokenExpired(): boolean {
    const token = localStorage.getItem('token');
    const tokenPayload = token ? JSON.parse(atob(token.split('.')[1])) : null;
    const tokenExpiration = tokenPayload?.exp * 1000; 
    return tokenExpiration ? Date.now() >= tokenExpiration : false; 
  }
  
  logoutExpiredSession(): void {
    if (this.tokenExpired()) {
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      this.logoutEvent.next();
      this.router.navigateByUrl('');
      // Mostrar mensaje al usuario
      Swal.fire({
        title: "Ingresa nuevamente",
        text: "Tu sesión ha expirado",
        icon: "warning"
      });
    }
  }

  recuperarContraseña(email: string, numeroDocumento: string): Observable<any> {
    return this.httpClient.post(`${base_url}/auth/validate`, { email, numeroDocumento });
  }

  cambiarContraseña(nuevaContraseña: string): Observable<any> {
    return this.httpClient.put(`${base_url}/auth/validate`, { password: nuevaContraseña }, this.headers);
=======
  recuperarContraseña(login: string, nDocumento: string): Observable<any> {
    return this.httpClient.post(`${base_url}/auth/recuperar`, { login, nDocumento });
  }

  cambiarContraseña(nuevaContraseña: string): Observable<any> {
    return this.httpClient.put(`${base_url}/auth/cambiar`, { password: nuevaContraseña }, this.headers);
>>>>>>> db0bf76b35262a94f152f82a251a33d5b088837d
  }

}