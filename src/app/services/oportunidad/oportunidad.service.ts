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

  getInteraccion(){
    return this.httpClient.get(`${base_url}/oportunidad/interacciones`, this.headers)
  }

  getSinGestor(){
    return this.httpClient.get(`${base_url}/oportunidad/sin-gestor`, this.headers)
  }

  asignarGestor(idOpor: string , usuarioGestor: string) {
    return this.httpClient.put(`${base_url}/oportunidad/asignar/${idOpor}`, {usuarioGestor: usuarioGestor}, this.headers);
  }

  editarOportunidad(oportunidad: OportunidadModel) {
    return this.httpClient.put(`${base_url}/oportunidad/${oportunidad._id}`, oportunidad, this.headers);
  }

  editarEstadoOpor(oporId: string ,estado: string){
    return this.httpClient.put(`${base_url}/oportunidad/${oporId}`, {estado: estado}, this.headers);
  }

  eliminarOportunidad(id: string) {
    return this.httpClient.delete(`${base_url}/oportunidad/${id}`, this.headers);
  }

}
