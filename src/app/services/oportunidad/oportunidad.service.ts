import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { OportunidadModel } from '../../core/models/oportunidad.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class OportunidadService {

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

  crearOportunidad(oportunidad: OportunidadModel){
    return this.httpClient.post(`${base_url}/oportunidad`, oportunidad, this.headers)
  }

  getOportunidad(){
    return this.httpClient.get(`${base_url}/oportunidad`, this.headers)
  }

  /* editarUsuario(usuario: UsuarioModel) {
    return this.httpClient.put(`${base_url}/usuarioM/${usuario._id}`, usuario, this.headers);
  } */

  /* eliminarUsuario(id: string) {
    return this.httpClient.delete(`${base_url}/usuarioM/${id}`, this.headers);
  } */

}
