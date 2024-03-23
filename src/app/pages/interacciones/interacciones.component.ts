import { Component } from '@angular/core';
import { TableComponent } from "../../components/table/table.component";
import { format } from 'date-fns';
import { InteraccionModel } from '../../core/models/interaccion.model';
import { OportunidadService } from '../../services/oportunidad/oportunidad.service';

@Component({
    selector: 'app-interacciones',
    standalone: true,
    templateUrl: './interacciones.component.html',
    styleUrl: './interacciones.component.css',
    imports: [TableComponent]
})
export class InteraccionesComponent {

  interacciones: InteraccionModel[]=[];
  interaccion: InteraccionModel | null = null;

  constructor(private getInter: OportunidadService){}

  headNames: string[] = [
    'refInteraccion',
    'descripcion',
    'accion',
    'createdAt',
    'updatedAt',
  ];

  headMap: { [key: string]: string } = {
    refInteraccion: 'Asesor encargado',
    descripcion: 'Descripción',
    accion: 'Accion',
    createdAt: 'F. Creacion',
    updatedAt: 'F. Modificado',
  };

  acciones: { nombre: string, evento: string }[] = [
    { nombre: 'Editar', evento: 'editar' },
    { nombre: 'Cambiar accion', evento: 'cAccion' },
    { nombre: 'Eliminar', evento: 'eliminar' }
  ];

  ejecutarAccion(evento: any) {
    const accion = evento.accion;
    const fila = evento.fila;  
    switch (accion) {
      case 'editar':
        this.interaccion = fila;
        break;
      case 'cAccion':
        this.interaccion = fila;
        break;
      case 'eliminar':
        this.interaccion = fila;
        break;
      default:
        break;
    }
  }

  ngOnInit(): void {
    this.obtenerInteracciones();
  }

  obtenerInteracciones() {
    this.getInter.getInteraccion().subscribe({
      next: (resp: any) => {
        if (resp.ok) {
          /* this.interacciones = resp.interacciones; */
          this.interacciones = this.transformarInteracciones(resp.interacciones);
        } else {
          console.error('Error al obtener las interacciones:', resp.msg);
          // mostrar un mensaje de error al usuario
        }
      },
      error: (error) => {
        console.error('Error al obtener las interacciones:', error);
        //mostrar un mensaje de error al usuario o tomar otras acciones según sea necesario
      }
    });
  }

  transformarInteracciones(interacciones: any[]): any[] {
    return interacciones.map((interaccion) => ({
        ...interaccion,
        refInteraccion:  interaccion.refInteraccion.usuarioGestor.nombre || '',
        createdAt: interaccion.createdAt ? this.formatDate(interaccion.createdAt.toString()) : '',
        updatedAt: interaccion.updatedAt ? this.formatDate(interaccion.updatedAt.toString()) : '',
    })).sort((a, b) => a.refInteraccion.localeCompare(b.refInteraccion));
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return format(date, 'yyyy-MM-dd HH:mm:ss');
  }


}
