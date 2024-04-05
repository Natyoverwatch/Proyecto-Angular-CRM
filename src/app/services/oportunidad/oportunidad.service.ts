import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { OportunidadModel } from '../../core/models/oportunidad.model';
import { InteraccionModel } from '../../core/models/interaccion.model';

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

  getSinGestor(){
    return this.httpClient.get(`${base_url}/oportunidad/sin-gestor`, this.headers)
  }

  asignarGestor(idOpor: string , usuarioGestor: string) {
<<<<<<< HEAD
    return this.httpClient.put(`${base_url}/oportunidad/asignar/${idOpor}`, {userGestor: usuarioGestor}, this.headers);
=======
    return this.httpClient.put(`${base_url}/oportunidad/asignar/${idOpor}`, {usuarioGestor: usuarioGestor}, this.headers);
>>>>>>> db0bf76b35262a94f152f82a251a33d5b088837d
  }

  editarOportunidad(cambios: any, oportunidadId: string) {
    return this.httpClient.put(`${base_url}/oportunidad/${oportunidadId}`, cambios, this.headers);
  }

  editarEstadoOpor(oporId: string ,estado: string){
<<<<<<< HEAD
    return this.httpClient.put(`${base_url}/oportunidad/${oporId}`, {stateOportunity: estado}, this.headers);
=======
    return this.httpClient.put(`${base_url}/oportunidad/${oporId}`, {estado: estado}, this.headers);
>>>>>>> db0bf76b35262a94f152f82a251a33d5b088837d
  }

  eliminarOportunidad(id: string) {
    return this.httpClient.delete(`${base_url}/oportunidad/${id}`, this.headers);
  }

  getInteraccion(){
<<<<<<< HEAD
    return this.httpClient.get(`${base_url}/interaccion`, this.headers)
  }

  getInteraccionOpor(oportunidadId: string){
    return this.httpClient.get(`${base_url}/interaccion/oportunidad/${oportunidadId}`, this.headers)
=======
    return this.httpClient.get(`${base_url}/oportunidad/interacciones`, this.headers)
>>>>>>> db0bf76b35262a94f152f82a251a33d5b088837d
  }

  crearInteraccion(interaccion: InteraccionModel){
    return this.httpClient.post(`${base_url}/interaccion`, interaccion, this.headers)
  }

  editarInteraccion(interaccion: InteraccionModel, interaccionid: string) {
    return this.httpClient.put(`${base_url}/interaccion/${interaccionid}`, interaccion, this.headers);
  }

  eliminarInteraccion(id: string) {
    return this.httpClient.delete(`${base_url}/interaccion/${id}`, this.headers);
  }

}
