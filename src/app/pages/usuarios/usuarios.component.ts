import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../core/models/usuario.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { UsuariosService } from '../../services/usuarios/usuario.service';
import { TableComponent } from '../../components/table/table.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { format } from 'date-fns';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
  imports: [TableComponent, ReactiveFormsModule, ModalComponent],
})
export class UsuariosComponent implements OnInit {
  usuarios: UsuarioModel[] = [];
  usuario: UsuarioModel | null = null;
  editarForm: FormGroup = {} as FormGroup;
  controlModal: boolean = false;
  controlModal2: boolean = false;

  constructor(private fb: FormBuilder, private userServ: UsuariosService) {}

  ngOnInit(): void {
    this.inicializarFormulario();
    this.obtenerUsuarios();
  }

  //Controles del modal
  openModal(): void {
    this.controlModal = true;
  }
  closeModal(): void {
    this.controlModal = false;
  }

  //Controles del modal2
  openModal2(): void {
    this.controlModal2 = true;
  }
  closeModal2(): void {
    this.controlModal2 = false;
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

  obtenerUsuarios(): void {
    this.userServ.getUsuarios().subscribe((data: any) => {
      this.usuarios = this.transformarUsuarios(data.usuarios);
    });
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
          this.closeModal();
          console.log('Usuario actualizado con éxito:', resp);
        },
        error: (error) => {
          console.error('Error al actualizar usuario:', error);
        },
      });
    }
  }

  editarUsuario(usuario: UsuarioModel | null): void {
    this.usuario = usuario;
    this.inicializarFormulario();
    this.openModal();
  }

  borrarUsuario(usuario: UsuarioModel): void {
    this.usuario = usuario;
    this.openModal2();
  }

  eliminarUsuarioConfirmado(usuario: UsuarioModel | null): void {
    if (usuario) {
      if (usuario._id) {
        this.userServ.eliminarUsuario(usuario._id).subscribe({
          next: () => {
            this.obtenerUsuarios();
            this.closeModal2(); // Cerrar el modal después de eliminar el usuario
          },
          error: (error) => {
            console.error('Error al eliminar usuario:', error);
          },
        });
      }
    }
  }

  cancelarEliminacion(): void {
    this.closeModal2();
  }

  onCancel(): void {
    this.closeModal();
    this.editarForm.reset();
  }
}
