import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../core/models/usuario.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios/usuario.service';
import { format } from 'date-fns';

@Component({
  selector: 'app-base-usuarios',
  standalone: true,
  imports: [],
  templateUrl: './base-usuarios.component.html',
  styleUrl: './base-usuarios.component.css'
})
export class BaseUsuariosComponent implements OnInit {
  usuarios: UsuarioModel[] = [];
  usuario: UsuarioModel | null = null;
  nuevoRol: string = '';
  editarForm: FormGroup = {} as FormGroup;
  modalAbierto: 'modal1' | 'modal2' | 'modal3' | 'modal4' | null = null;

  constructor(private fb: FormBuilder, public userServ: UsuariosService) {}

  ngOnInit(): void {
    this.inicializarFormulario();
    this.obtenerUsuarios();
  }

  abrirModal1(): void {
    this.modalAbierto = 'modal1';
  }
  abrirModal2(): void {
    this.modalAbierto = 'modal2';
  }
  abrirModal3(): void {
    this.modalAbierto = 'modal3';
  }
  abrirModal4(): void {
    this.modalAbierto = 'modal4';
  }
  cerrarModal(): void {
    this.modalAbierto = null;
  }

  headNames: string[] = [
    'nombre',
    'email',
    'telefono',
    'direccion',
    'tDocumento',
    'nDocumento',
    'login',
    'rol',
    'estado',
    'createdAt',
    'updatedAt',
  ];

  headMap: { [key: string]: string } = {
    nombre: 'Nombre',
    email: 'Correo Electrónico',
    telefono: 'Teléfono',
    direccion: 'Dirección',
    tDocumento: 'Tipo Documento',
    nDocumento: 'Número Documento',
    login: 'Nombre de Usuario',
    rol: 'Rol',
    estado: 'Estado',
    createdAt: 'F. Creacion',
    updatedAt: 'F. Modificado',
  };

  acciones: { nombre: string, evento: string }[] = [
    { nombre: 'Editar', evento: 'editar' },
    { nombre: 'Cambiar Rol', evento: 'cRol' },
    { nombre: 'Cambiar Estado', evento: 'cEstado' },
    { nombre: 'Eliminar', evento: 'eliminar' }
  ];

  ejecutarAccion(evento: any) {
    const accion = evento.accion;
    const fila = evento.fila;  
    switch (accion) {
      case 'editar':
        this.usuario = fila;
        this.inicializarFormulario();
        this.abrirModal1();
        break;
      case 'eliminar':
        this.usuario = fila;
        this.abrirModal2();
        break;
      case 'cEstado':
        this.usuario = fila;
        this.abrirModal3();
        break;
      case 'cRol':
        this.usuario = fila;
        this.abrirModal4();
        break;
      default:
        break;
    }
  }  

  obtenerUsuarios(): void {
  }

  transformarUsuarios(usuarios: UsuarioModel[]): any[] {
    return usuarios
      .map((usuario) => ({
        ...usuario,
        estado: usuario.estado ? 'Activo' : 'Inactivo',
        createdAt: usuario.createdAt
          ? this.formatDate(usuario.createdAt.toString())
          : '',
        updatedAt: usuario.updatedAt
          ? this.formatDate(usuario.updatedAt.toString())
          : '',
      }))
      .sort((a, b) => a.nombre.localeCompare(b.nombre));
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return format(date, 'yyyy-MM-dd HH:mm:ss');
  }

  inicializarFormulario(): void {
    this.editarForm = this.fb.group({
      id: [this.usuario?._id || ''],
      nombre: [this.usuario?.nombre || '', [Validators.required]],
      direccion: [this.usuario?.direccion || '', [Validators.required]],
      telefono: [this.usuario?.telefono || '', [Validators.required]],
      email: [
        this.usuario?.email || '',
        [Validators.required, Validators.email],
      ],
      tDocumento: [this.usuario?.tDocumento || '', [Validators.required]],
      nDocumento: [this.usuario?.nDocumento || '', [Validators.required]],
      login: [this.usuario?.login || '', [Validators.required]],
      rol: [this.usuario?.rol || '', [Validators.required]],
      estado: [
        this.usuario?.estado ? 'Activo' : 'Inactivo',
        [Validators.required],
      ],
    });
  }

  onSubmit(): void {
    if (this.editarForm.valid) {
      const formData = this.editarForm.value;
      if (typeof formData.createdAt === 'string') {
        formData.createdAt = this.formatDate(formData.createdAt);
      }
      if (typeof formData.updatedAt === 'string') {
        formData.updatedAt = this.formatDate(formData.updatedAt);
      }
      const estadoBooleano = formData.estado === 'Activo';
      const usuarioActualizado = {
        ...this.usuario,
        ...formData,
        estado: estadoBooleano,
      };
      this.userServ.editarUsuario(usuarioActualizado).subscribe({
        next: (resp) => {
          this.editarForm.reset();
          this.obtenerUsuarios();
          this.cerrarModal();
          console.log('Usuario actualizado con éxito:', resp);
        },
        error: (error) => {
          console.error('Error al actualizar usuario:', error);
        },
      });
    }
  }

  eliminarUsuarioConfirmado(usuario: UsuarioModel | null): void {
    if (usuario?._id) {
        this.userServ.eliminarUsuario(usuario._id).subscribe({
            next: () => {
                this.obtenerUsuarios();
                this.cerrarModal();
            },
            error: (error) => {
                console.error('Error al eliminar usuario:', error);
            },
        });
      }
  }


  onCancel(): void {
    this.cerrarModal();
    this.editarForm.reset();
  }

  cambiarRolUsuario(usuario: UsuarioModel | null, nuevoRol: string) {
    if (usuario && usuario._id) {
        this.userServ.cambiarRol(usuario._id, nuevoRol).subscribe({
            next: () => {
                this.obtenerUsuarios();
                this.cerrarModal();
            },
            error: (error) => {
                console.error('Error al cambiar el rol del usuario:', error);
            },
        });
    }
  }


  cambiarEstadoUsuario(usuario: UsuarioModel | null): void {
    if (usuario?._id) {
        this.userServ.cambiarEstado(usuario._id).subscribe({
            next: () => {
                this.obtenerUsuarios();
                this.cerrarModal();
            },
            error: (error) => {
                console.error('Error al cambiar el estado de usuario:', error);
            },
        });
    }
  }

}
