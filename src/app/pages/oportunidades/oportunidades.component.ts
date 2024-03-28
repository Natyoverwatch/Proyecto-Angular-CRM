import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TableComponent } from "../../components/table/table.component";
import { OportunidadModel } from '../../core/models/oportunidad.model';
import { OportunidadService } from '../../services/oportunidad/oportunidad.service';
import { format } from 'date-fns';
import { InteraccionModel } from '../../core/models/interaccion.model';
import { ModalComponent } from "../../components/modal/modal.component";
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioModel } from '../../core/models/usuario.model';
import { UsuariosService } from '../../services/usuarios/usuario.service';

@Component({
    selector: 'app-oportunidades',
    standalone: true,
    templateUrl: './oportunidades.component.html',
    styleUrl: './oportunidades.component.css',
    imports: [TableComponent, ModalComponent, FormsModule]
})
export class OportunidadesComponent implements OnInit {
  @ViewChild('newOpor') opor: ElementRef<HTMLFormElement>;
  @ViewChild('oporEdit') form: ElementRef<HTMLFormElement>;
  usuarios: UsuarioModel[] = [];
  oportunidades: OportunidadModel[]=[];
  oportunidad: OportunidadModel | null = null;
  nuevaOportunidad:  OportunidadModel = new OportunidadModel('', '', 'Sin gestor', '', null, '', []);
  interacciones: InteraccionModel[]=[];
  interaccion: InteraccionModel;
  nuevoEstadoOpor: string= "";
  refInteraccionOriginal: string = '';
  mostrarInteracciones: boolean = false;
  editar: boolean = false;
  modalAbierto: 'modal1' | 'modal2' | 'modal3' | 'modal4' | 'modal5' | 'modal6' | null = null;

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
        this.abrirModal2();
        break;
      case 'crearInteraccion':
        this.oportunidad = fila;
        this.abrirModal1();
        break;
      case 'consInteraccion':
        this.oportunidad = fila;
        if (this.oportunidad?._id) {
          this.obtenerInteraccionesDeOportunidadSeleccionada(this.oportunidad._id);
        }
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
    this.obtenerUsuarios();
    this.obtenerOportunidades();
    this.interaccion = this.interaccion = new InteraccionModel('', '', '');;
  }

  obtenerUsuarios(): void {
    this.userServ.getUsuarios().subscribe((data: any) => {
      this.usuarios = data.usuarios;
    });
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
    'accion',
    'descripcion',
    'createdAt',
    'updatedAt',
  ];

  headMapInt: { [key: string]: string } = {
    refInteraccion: 'Asesor encargado',
    accion: 'Accion',
    descripcion: 'Descripción',
    createdAt: 'F. Creacion',
    updatedAt: 'F. Modificado',
  };

  accionesInt: { nombre: string, evento: string }[] = [
    { nombre: 'Editar', evento: 'editarInt' },
    { nombre: 'Eliminar', evento: 'eliminarInt' }
  ];

  ejecutarAccionInt(evento: any) {
    const accion = evento.accion;
    const fila = evento.fila;  
    switch (accion) {
      case 'editarInt':
        this.interaccion = fila;
        this.abrirModal1();
        this.editar=true;
        break;
      case 'eliminarInt':
        this.interaccion = fila;
        this.abrirModal6();
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
    return interacciones.map((interaccion) => {
        this.refInteraccionOriginal = interaccion.refInteraccion;
        return {
            ...interaccion,
            refInteraccion: this.oportunidad?.usuarioGestor || '',
            createdAt: interaccion.createdAt ? this.formatDate(interaccion.createdAt.toString()) : '',
            updatedAt: interaccion.updatedAt ? this.formatDate(interaccion.updatedAt.toString()) : '',
        };
    });
  }

  guardarCambiosOpor(): void {
    if (this.oportunidad && this.oportunidad._id) {
      const cambios: any = {
        nomOportunidad: this.oportunidad.nomOportunidad,
        descripcion: this.oportunidad.descripcion,
        estado: this.oportunidad.estado
      };  
      this.getOpor.editarOportunidad(cambios, this.oportunidad._id).subscribe({
        next: (resp: any) => {
          this.obtenerOportunidades();
          this.form.nativeElement.reset();
          this.cerrarModal();
          Swal.fire({
            title: "Cambios guardados exitosamente",
            text: resp.msg,
            icon: "success"
          });
        },
        error: (error) => {
          console.error('Error al guardar cambios:', error);
        }
      });
    }
  }

  crearInteraccion(interaccion: InteraccionModel): void {
    if (this.oportunidad && this.oportunidad._id) {
        const idOportunidad: string = this.oportunidad._id;
        // Completar los datos del formulario con el ID de la oportunidad
        const datosFormulario: InteraccionModel = {
            refInteraccion: idOportunidad,
            accion: interaccion.accion,
            descripcion: interaccion.descripcion
        };

        // Llamar al servicio para crear la interacción con los datos completos del formulario
        this.getOpor.crearInteraccion(datosFormulario).subscribe({
            next: (resp: any) => {
                this.obtenerOportunidades();
                this.form.nativeElement.reset();
                this.cerrarModal();
                Swal.fire({
                    title: "Interaccion creada exitosamente",
                    text: resp.msg,
                    icon: "success"
                });
            },
            error: (error) => {
                console.error('Error al guardar cambios:', error);
            }
        });
    } else {
        console.error('La oportunidad no tiene un ID definido.');
    }
  }

  nuevaOpor() {
    // este es el mensaje de carga
    Swal.fire({
      title: 'Creando oportunidad...',
      allowOutsideClick: false,  
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading(); // Mostrar el indicador de carga
      }
    });
  
    if (this.nuevaOportunidad) {
      this.getOpor.crearOportunidad(this.nuevaOportunidad).subscribe({
        next: (resp: any) => {
          // Cerrar mensaje de carga
          Swal.close();
  
          Swal.fire({
            title: 'Oportunidad creada exitosamente',
            text: resp.msg,
            icon: 'success'
          });
  
          this.obtenerOportunidades();
          this.opor.nativeElement.reset();
          this.cerrarModal();
        },
        error: (error) => {
          // Cerrar mensaje de carga
          Swal.close();
  
          Swal.fire({
            title: 'No se pudo crear la oportunidad',
            text: error.error.msg,
            icon: 'error'
          });
        }
      });
    }
  }

  guardarCambiosInt() {
    if (this.interaccion && this.interaccion._id) {
        const cambios: any = {
            refInteraccion: this.refInteraccionOriginal,
            descripcion: this.interaccion.descripcion,
            accion: this.interaccion.accion
        };
        this.getOpor.editarInteraccion(cambios, this.interaccion._id).subscribe({
            next: (resp: any) => {
                this.obtenerOportunidades();
                this.cerrarModal();
                this.mostrarInteracciones=false;
                this.form.nativeElement.reset();
                Swal.fire({
                    title: "Interaccion guardada exitosamente",
                    text: resp.msg,
                    icon: "success"
                });
            },
            error: (error) => {
                Swal.fire({
                    title: "No se pudo editar la interaccion",
                    text: error.error.msg,
                    icon: "error"
                });
            }
        });
    }    
  }

  eliminarInteraccion(interaccion: InteraccionModel | null): void {
    if (interaccion?._id) {
        this.getOpor.eliminarInteraccion(interaccion._id).subscribe({
            next: (resp: any) => {
                this.obtenerOportunidades();
                this.cerrarModal();
                this.mostrarInteracciones=false;
                Swal.fire({
                  title: "Interaccion eliminada exitosamente",
                  text: resp.msg,
                  icon: "success"
              });
            },
            error: (error) => {
              Swal.fire({
                title: "No se pudo eliminar la interaccion",
                text: error.error.msg,
                icon: "error"
              });
            },
        });
      }
  }

  onCancel(): void {
    this.cerrarModal();
    this.opor.nativeElement.reset();
    this.editar=false;
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
  cerrarModal(): void {
    this.modalAbierto = null;
  }

}