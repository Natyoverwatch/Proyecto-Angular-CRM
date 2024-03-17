import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../../core/models/usuario.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers:{
        'x-token': this.token,
      },
    };
  }

  constructor(private httpClient: HttpClient) { }

  getUsuarios(){
    return this.httpClient.get(`${base_url}/usuarioM`, this.headers)
  }

  crearUsuario(usuario: UsuarioModel){
    return this.httpClient.post(`${base_url}/usuarioM`, usuario)
  }

}