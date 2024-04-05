import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../core/models/usuario.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios/usuario.service';
import { format } from 'date-fns';
<<<<<<< HEAD
import Swal from 'sweetalert2';
=======
>>>>>>> db0bf76b35262a94f152f82a251a33d5b088837d

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
<<<<<<< HEAD
    'celular',
    'direccion',
    'tipoDocumento',
    'numeroDocumento',
=======
    'telefono',
    'direccion',
    'tDocumento',
    'nDocumento',
>>>>>>> db0bf76b35262a94f152f82a251a33d5b088837d
    'login',
    'rol',
    'estado',
    'createdAt',
<<<<<<< HEAD
    'updateAt',
=======
    'updatedAt',
>>>>>>> db0bf76b35262a94f152f82a251a33d5b088837d
  ];

  headMap: { [key: string]: string } = {
    nombre: 'Nombre',
    email: 'Correo Electrónico',
<<<<<<< HEAD
    celular: 'Teléfono',
    direccion: 'Dirección',
    tipoDocumento: 'Tipo Documento',
    numeroDocumento: 'Número Documento',
=======
    telefono: 'Teléfono',
    direccion: 'Dirección',
    tDocumento: 'Tipo Documento',
    nDocumento: 'Número Documento',
>>>>>>> db0bf76b35262a94f152f82a251a33d5b088837d
    login: 'Nombre de Usuario',
    rol: 'Rol',
    estado: 'Estado',
    createdAt: 'F. Creacion',
<<<<<<< HEAD
    updateAt: 'F. Modificado',
=======
    updatedAt: 'F. Modificado',
>>>>>>> db0bf76b35262a94f152f82a251a33d5b088837d
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
<<<<<<< HEAD
    return usuarios.map((usuario) => ({
=======
    return usuarios
      .map((usuario) => ({
>>>>>>> db0bf76b35262a94f152f82a251a33d5b088837d
        ...usuario,
        estado: usuario.estado ? 'Activo' : 'Inactivo',
        createdAt: usuario.createdAt
          ? this.formatDate(usuario.createdAt.toString())
          : '',
<<<<<<< HEAD
        updateAt: usuario.updateAt 
          ? this.formatDate(usuario.updateAt.toString())
          : '', 
=======
        updatedAt: usuario.updatedAt
          ? this.formatDate(usuario.updatedAt.toString())
          : '',
>>>>>>> db0bf76b35262a94f152f82a251a33d5b088837d
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
<<<<<<< HEAD
      celular: [this.usuario?.celular || '', [Validators.required]],
=======
      telefono: [this.usuario?.telefono || '', [Validators.required]],
>>>>>>> db0bf76b35262a94f152f82a251a33d5b088837d
      email: [
        this.usuario?.email || '',
        [Validators.required, Validators.email],
      ],
<<<<<<< HEAD
      tipoDocumento: [this.usuario?.tipoDocumento || '', [Validators.required]],
      numeroDocumento: [this.usuario?.numeroDocumento || '', [Validators.required]],
=======
      tDocumento: [this.usuario?.tDocumento || '', [Validators.required]],
      nDocumento: [this.usuario?.nDocumento || '', [Validators.required]],
>>>>>>> db0bf76b35262a94f152f82a251a33d5b088837d
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
<<<<<<< HEAD
      if (typeof formData.updateAt === 'string') {
        formData.updateAt = this.formatDate(formData.updateAt);
=======
      if (typeof formData.updatedAt === 'string') {
        formData.updatedAt = this.formatDate(formData.updatedAt);
>>>>>>> db0bf76b35262a94f152f82a251a33d5b088837d
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
<<<<<<< HEAD
              Swal.fire({
                title: "Error al eliminar el usuario",
                text: error.error.msg,
                icon: "error"
              });
=======
                console.error('Error al eliminar usuario:', error);
>>>>>>> db0bf76b35262a94f152f82a251a33d5b088837d
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
<<<<<<< HEAD
              Swal.fire({
                title: "Error al cambiar el rol",
                text: error.error.msg,
                icon: "error"
              });
=======
                console.error('Error al cambiar el rol del usuario:', error);
>>>>>>> db0bf76b35262a94f152f82a251a33d5b088837d
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
<<<<<<< HEAD
              Swal.fire({
                title: "Error al cambiar el estado",
                text: error.error.msg,
                icon: "error"
              });
=======
                console.error('Error al cambiar el estado de usuario:', error);
>>>>>>> db0bf76b35262a94f152f82a251a33d5b088837d
            },
        });
    }
  }

}
