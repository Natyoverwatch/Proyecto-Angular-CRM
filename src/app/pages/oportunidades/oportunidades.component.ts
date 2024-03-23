import { Component, OnInit } from '@angular/core';
import { TableComponent } from "../../components/table/table.component";
import { OportunidadModel } from '../../core/models/oportunidad.model';
import { OportunidadService } from '../../services/oportunidad/oportunidad.service';
import { format } from 'date-fns';
import { InteraccionModel } from '../../core/models/interaccion.model';
import { ModalComponent } from "../../components/modal/modal.component";
import { UsuariosService } from '../../services/usuarios/usuario.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-oportunidades',
    standalone: true,
    templateUrl: './oportunidades.component.html',
    styleUrl: './oportunidades.component.css',
    imports: [TableComponent, ModalComponent, FormsModule]
})
export class OportunidadesComponent implements OnInit {
  oportunidades: OportunidadModel[]=[];
  oportunidad: OportunidadModel | null = null;
  interacciones: InteraccionModel[]=[];
  interaccion: InteraccionModel | null = null;
  nuevoEstadoOpor: string= "";
  mostrarInteracciones: boolean = false;
  modalAbierto: 'modal1' | 'modal2' | 'modal3' | 'modal4' | 'modal5' | 'modal6' | 'modal7' | 'modal8' | null = null;

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
    { nombre: 'Editar', evento: 'editar' },
    { nombre: 'Crear interacción', evento: 'crearInteraccion' },
    { nombre: 'Consultar interacciónes', evento: 'consInteraccion' },
    { nombre: 'Cambiar estado', evento: 'cEstado' },
    { nombre: 'Eliminar', evento: 'eliminar' }
  ];

  ejecutarAccion(evento: any) {
    const accion = evento.accion;
    const fila = evento.fila;  
    switch (accion) {
      case 'editar':
        this.oportunidad = fila;
        break;
      case 'crearInteraccion':
        this.oportunidad = fila;
        break;
      case 'consInteraccion':
        this.oportunidad = fila;
        if (this.oportunidad?._id) {
          this.obtenerInteraccionesDeOportunidadSeleccionada(this.oportunidad._id);
        } else {
          console.error('ID de oportunidad no válido');
        };
        break;
      case 'eliminar':
        this.oportunidad = fila;
        this.abrirModal4();
        break;
      case 'cEstado':
        this.oportunidad = fila;
        this.abrirModal3();
        break;
      default:
        break;
    }
  }

  ngOnInit(): void {
    this.obtenerOportunidades();
  }

  obtenerOportunidades() {
    this.getOpor.getOportunidad().subscribe({
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

  cambiarEstadoOpor(oportunidad: OportunidadModel | null, estado: string){
    if(oportunidad && oportunidad._id){
      this.getOpor.editarEstadoOpor(oportunidad?._id, estado).subscribe({
        next: () => {
          this.obtenerOportunidades();
          this.cerrarModal();
        },
        error: (error) => {
          console.error('Error al cambiar estado a la oportunidad:', error);
          },
      });
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return format(date, 'yyyy-MM-dd HH:mm:ss');
  }



  headNamesInt: string[] = [
    'refInteraccion',
    'descripcion',
    'accion',
    'createdAt',
    'updatedAt',
  ];

  headMapInt: { [key: string]: string } = {
    refInteraccion: 'Asesor encargado',
    descripcion: 'Descripción',
    accion: 'Accion',
    createdAt: 'F. Creacion',
    updatedAt: 'F. Modificado',
  };

  accionesInt: { nombre: string, evento: string }[] = [
    { nombre: 'Editar', evento: 'editarInt' },
    { nombre: 'Cambiar accion', evento: 'cAccion' },
    { nombre: 'Eliminar', evento: 'eliminarInt' }
  ];

  ejecutarAccionInt(evento: any) {
    const accion = evento.accion;
    const fila = evento.fila;  
    switch (accion) {
      case 'editarInt':
        this.interaccion = fila;
        break;
      case 'cAccion':
        this.interaccion = fila;
        break;
      case 'eliminarInt':
        this.interaccion = fila;
        break;
      default:
        break;
    }
  }

  obtenerInteraccionesDeOportunidadSeleccionada(oportunidadId: string) {
    this.getOpor.getOportunidad().subscribe({
      next: (resp: any) => {
        if (resp.ok) {
          // Buscar la oportunidad seleccionada por su ID
          const oportunidadSeleccionada = resp.oportunidades.find((oportunidad: any) => oportunidad._id === oportunidadId);
          if (oportunidadSeleccionada) {
            // Asignar las interacciones de la oportunidad seleccionada a this.interacciones
            this.interacciones = this.transformarInteracciones(oportunidadSeleccionada.interacciones);
            this.mostrarInteracciones=true;
          } else {
            console.error('Oportunidad seleccionada no encontrada');
          }
        } else {
          console.error('Error al obtener las interacciones:', resp.msg);
          // mostrar un mensaje de error al usuario
        }
      },
      error: (error) => {
        console.error('Error al obtener las interacciones:', error);
        // mostrar un mensaje de error al usuario o tomar otras acciones según sea necesario
      }
    });
  }

  transformarInteracciones(interacciones: any[]): any[] {
    return interacciones.map((interaccion) => ({
        ...interaccion,
        refInteraccion:  this.oportunidad?.usuarioGestor || '',
        createdAt: interaccion.createdAt ? this.formatDate(interaccion.createdAt.toString()) : '',
        updatedAt: interaccion.updatedAt ? this.formatDate(interaccion.updatedAt.toString()) : '',
    }));
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
  abrirModal5(): void {
    this.modalAbierto = 'modal5';
  }
  abrirModal6(): void {
    this.modalAbierto = 'modal6';
  }
  abrirModal7(): void {
    this.modalAbierto = 'modal7';
  }
  abrirModal8(): void {
    this.modalAbierto = 'modal8';
  }
  cerrarModal(): void {
    this.modalAbierto = null;
  }

}