import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../core/models/usuario.model';
import { UsuariosService } from '../../services/usuarios/usuario.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
})
export class PerfilComponent implements OnInit{
  usuario: UsuarioModel | null = null;
  editMode: boolean = false;

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit(): void {
    const usuarioString = localStorage.getItem('usuario');
    if (usuarioString) {
      const usuario: UsuarioModel = JSON.parse(usuarioString);      
      if (usuario._id) {
        this.usuariosService.obtenerUsuario(usuario._id).subscribe({
          next: (resp: any) => {
            this.usuario = resp.usuario;
          },
          error: (error: any) => {
            console.error('Error al obtener el usuario:', error);
          }
        });
      }
    } 
  }
 
  cambiarContrasena(): void {
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  capturarCambios() {
    if (this.usuario) {
      this.usuario = { ...this.usuario };
    } else {
      console.error('El usuario es nulo. No se pueden capturar cambios.');
    }
  }

  guardarCambios() {
    if (this.editMode) {
      if (this.usuario) {
        this.usuariosService.editarUsuario(this.usuario).subscribe({
          next: (resp) => {
            console.log('Cambios guardados exitosamente:', resp);
            this.toggleEditMode();
          },
          error: (error) => {
            console.error('Error al guardar cambios:', error);
          }
        });
      }
    } else {
      this.toggleEditMode();
    }
  }
}
