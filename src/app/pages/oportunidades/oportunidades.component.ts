import { Component, OnInit } from '@angular/core';
import { TableComponent } from "../../components/table/table.component";
import { OportunidadModel } from '../../core/models/oportunidad.model';
import { OportunidadService } from '../../services/oportunidad/oportunidad.service';
import { format } from 'date-fns';

@Component({
    selector: 'app-oportunidades',
    standalone: true,
    templateUrl: './oportunidades.component.html',
    styleUrl: './oportunidades.component.css',
    imports: [TableComponent]
})
export class OportunidadesComponent implements OnInit {
  oportunidades: OportunidadModel[]=[];
  oportunidad: OportunidadModel | null = null;

  constructor(private getOpor: OportunidadService){}

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
        break;
      case 'eliminar':
        this.oportunidad = fila;
        break;
      case 'cEstado':
        this.oportunidad = fila;
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

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return format(date, 'yyyy-MM-dd HH:mm:ss');
  }

}
