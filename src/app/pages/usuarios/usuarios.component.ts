import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../core/models/usuario.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios/usuario.service';
import { TableComponent } from "../../components/table/table.component";
import { ModalComponent } from "../../components/modal/modal.component";

@Component({
    selector: 'app-usuarios',
    standalone: true,
    templateUrl: './usuarios.component.html',
    styleUrl: './usuarios.component.css',
    imports: [TableComponent, ReactiveFormsModule, ModalComponent]
})
export class UsuariosComponent implements OnInit{

  usuarios: UsuarioModel [] = [];
  usuario: UsuarioModel | null = null;
  editarForm: FormGroup = {} as FormGroup;
  controlModal: boolean = false;

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
    updatedAt: 'F. Modificado'
  };

  obtenerUsuarios(): void {
    this.userServ.getUsuarios().subscribe((data: any) => {
      this.usuarios = this.transformarUsuarios(data.usuarios);
    });
  }

  transformarUsuarios(usuarios: UsuarioModel[]): any[] {
    return usuarios.map(usuario => ({ ...usuario, estado: usuario.estado ? 'Activo' : 'Inactivo' }))
    .sort((a, b) => a.nombre.localeCompare(b.nombre));
  }

  inicializarFormulario(): void {
    this.editarForm = this.fb.group({
      id: [this.usuario?._id || '',],
      nombre: [this.usuario?.nombre || '', [Validators.required]],
      direccion: [this.usuario?.direccion || '', [Validators.required]],
      telefono: [this.usuario?.telefono || '', [Validators.required]],
      email: [this.usuario?.email || '', [Validators.required, Validators.email]],
      tDocumento: [this.usuario?.tDocumento || '', [Validators.required]],
      nDocumento: [this.usuario?.nDocumento || '', [Validators.required]],
      login: [this.usuario?.login || '', [Validators.required]],
      rol: [this.usuario?.rol || '', [Validators.required]],
      estado: [this.usuario?.estado ? 'activo' : 'inactivo',],
    });
  }

  onSubmit(): void {
    if (this.editarForm.valid) {
      console.log(this.editarForm.value);
      this.editarForm.reset();
    }
  }

  editarUsuario(usuario: UsuarioModel | null): void {
    this.usuario = usuario; 
    this.inicializarFormulario();
    this.openModal();
  }

  onCancel(): void {
    this.closeModal();
    this.editarForm.reset();
  }

}