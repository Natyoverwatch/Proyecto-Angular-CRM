import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { UsuarioModel } from '../../core/models/usuario.model';
import { LoginInterfaces } from '../../core/interfaces/login-interfaces';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  usuario: UsuarioModel;

  constructor(private httpClient: HttpClient, private router: Router) { }

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
          telefono,
          direccion,
          tipoDocumento,
          numeroDocumento,
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
          telefono,
          direccion,
          tipoDocumento,
          numeroDocumento,
          login,
          password,
          rol,
          estado,
          createdAt,
          updatedAt,
          _id,
        ); 
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
      })
    );
  }

  logout(){
    localStorage.removeItem(`token`);
    this.router.navigateByUrl(`login`);
  }

  getUsuarioActual(): Observable<UsuarioModel> {
    return this.validateToken().pipe(
      map(() => {
        return this.usuario;
      })
    );
  }

}