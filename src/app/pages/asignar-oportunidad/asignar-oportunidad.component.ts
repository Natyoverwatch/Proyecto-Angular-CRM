import { Component, OnInit } from '@angular/core';
import { TableComponent } from "../../components/table/table.component";
import { OportunidadModel } from '../../core/models/oportunidad.model';
import { OportunidadService } from '../../services/oportunidad/oportunidad.service';
import { format } from 'date-fns';
import { ModalComponent } from "../../components/modal/modal.component";
import { FormsModule } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios/usuario.service';
import { UsuarioModel } from '../../core/models/usuario.model';

@Component({
    selector: 'app-asignar-oportunidad',
    standalone: true,
    templateUrl: './asignar-oportunidad.component.html',
    styleUrl: './asignar-oportunidad.component.css',
    imports: [TableComponent, ModalComponent, FormsModule]
})
export class AsignarOportunidadComponent implements OnInit {
  usuarios: UsuarioModel[] = [];
  oportunidades: OportunidadModel[]=[];
  oportunidad: OportunidadModel | null = null;
  nuevoGestor: string = '';
  modalAbierto: 'modal1' | 'modal2' | null = null;

  constructor(private getOpor: OportunidadService, private userServ: UsuariosService){}

  headNames: string[] = [
    'nomOportunidad',
    'descripcion',
    'estado',
    'usuarioCreador',
    'usuarioGestor',
    'usuarioAsignado',
    'interacciones',
    'createdAt',
    'updatedAt',
  ];

  headMap: { [key: string]: string } = {
    nomOportunidad: 'Nombre',
    descripcion: 'Descripción',
    estado: 'Estado',
    usuarioCreador: 'Creado por',
    usuarioGestor: 'Asesor encargado',
    usuarioAsignado: 'Cliente',
    interacciones: 'Numero Interacciones',
    createdAt: 'F. Creacion',
    updatedAt: 'F. Modificado',
  };

  acciones: { nombre: string, evento: string }[] = [
    { nombre: 'Asignar Asesor', evento: 'asignar' },
    { nombre: 'Eliminar', evento: 'eliminar' }
  ];

  ejecutarAccion(evento: any) {
    const accion = evento.accion;
    const fila = evento.fila;  
    switch (accion) {
      case 'asignar':
        this.oportunidad = fila;
        this.abrirModal1();
        break;
      case 'eliminar':
        this.oportunidad = fila;
        this.abrirModal2();
        break;
      default:
        break;
    }
  }

  ngOnInit(): void {
    this.obtenerOportunidades();
    this.obtenerStaff();
  }

  obtenerOportunidades() {
    this.getOpor.getSinGestor().subscribe({
      next: (resp: any) => {
        if (resp.ok) {
          this.oportunidades = this.transformarOportunidades(resp.oportunidades);
        } else {
          console.error('Error al obtener las oportunidades:', resp.msg);
          // mostrar un mensaje de error al usuario
        }
      },
      error: (error) => {
        console.error('Error al obtener las oportunidades:', error);
        //mostrar un mensaje de error al usuario o tomar otras acciones según sea necesario
      }
    });
  }

  transformarOportunidades(oportunidades: any[]): any[] {
    return oportunidades.map((oportunidad) => ({
      ...oportunidad,
      usuarioCreador: oportunidad.usuarioCreador.nombre || '',
      usuarioGestor: oportunidad.usuarioGestor ? (oportunidad.usuarioGestor.nombre || '') : 'Sin gestor',
      usuarioAsignado: oportunidad.usuarioAsignado.nombre || '',
      interacciones: oportunidad.interacciones.length,
      createdAt: oportunidad.createdAt ? this.formatDate(oportunidad.createdAt.toString()) : '',
      updatedAt: oportunidad.updatedAt ? this.formatDate(oportunidad.updatedAt.toString()) : '',
    })).sort((a, b) => a.nomOportunidad.localeCompare(b.nomOportunidad));
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return format(date, 'yyyy-MM-dd HH:mm:ss');
  }

  abrirModal1(): void {
    this.modalAbierto = 'modal1';
  }
  abrirModal2(): void {
    this.modalAbierto = 'modal2';
  }
  cerrarModal(): void {
    this.modalAbierto = null;
  }

  asignarGestor(oportunidad: OportunidadModel | null, nuevoGestor: string){
    if(oportunidad && oportunidad._id){
      this.getOpor.asignarGestor(oportunidad?._id, nuevoGestor).subscribe({
        next: () => {
          this.obtenerOportunidades();
          this.cerrarModal();
        },
        error: (error) => {
          console.error('Error al asignar gestor a la oportunidad:', error);
          },
      });
    }
  }

  obtenerStaff(): void {
    this.userServ.getUsuariosPorRol('Staff').subscribe((data: any) => {
      this.usuarios = data.usuarios.filter((usuario: any) => usuario.rol !== 'Supervisor');
    });
  }
  


  eliminarOportunidad(oportunidad: OportunidadModel | null): void {
    if (oportunidad?._id) {
        this.getOpor.eliminarOportunidad(oportunidad._id).subscribe({
            next: () => {
                this.obtenerOportunidades();
                this.cerrarModal();
            },
            error: (error) => {
                console.error('Error al eliminar oportunidad:', error);
            },
        });
      }
  }

}
