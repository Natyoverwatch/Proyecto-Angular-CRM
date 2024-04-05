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

  crearUsuario(usuario: UsuarioModel){
    return this.httpClient.post(`${base_url}/usuarioM`, usuario)
  }

  getUsuarios(){
    return this.httpClient.get(`${base_url}/usuarioM`, this.headers)
  }

  getUsuariosPorRol(rol: string) {
<<<<<<< HEAD
    return this.httpClient.get(`${base_url}/usuarioM/${rol}`, this.headers);
  }
=======
    let url = `${base_url}/usuarioM/${rol}`;
    if (rol === 'staff' || rol === 'equipo') {
        url = `${base_url}/usuarioM/Staff`;
    }
    return this.httpClient.get(url, this.headers);
}
>>>>>>> db0bf76b35262a94f152f82a251a33d5b088837d

  editarUsuario(usuario: UsuarioModel) {
    return this.httpClient.put(`${base_url}/usuarioM/${usuario._id}`, usuario, this.headers);
  }

<<<<<<< HEAD
  cambiarPass(usuarioid: string, password: string) {
    return this.httpClient.put(`${base_url}/usuarioM/${usuarioid}`, { password }, this.headers);
  }

=======
>>>>>>> db0bf76b35262a94f152f82a251a33d5b088837d
  obtenerUsuario(id: string) {
    return this.httpClient.get(`${base_url}/usuarioM/usuario/${id}`, this.headers);
  }

  cambiarRol(id: string, nuevoRol: string) {
    const nuevoUsuario = { rol: nuevoRol };
    return this.httpClient.put(`${base_url}/usuarioM/${id}`, nuevoUsuario, this.headers);
  }
  cambiarEstado(id: string) {
    return this.httpClient.put(`${base_url}/usuarioM/cambiarEstado/${id}`, {}, this.headers);
  }

  eliminarUsuario(id: string) {
    return this.httpClient.delete(`${base_url}/usuarioM/${id}`, this.headers);
  }

}