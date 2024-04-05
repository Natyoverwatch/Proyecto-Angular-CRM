import { Component, OnInit } from '@angular/core';
import { TableComponent } from "../../components/table/table.component";
import { OportunidadModel } from '../../core/models/oportunidad.model';
import { OportunidadService } from '../../services/oportunidad/oportunidad.service';
import { format } from 'date-fns';
import { ModalComponent } from "../../components/modal/modal.component";
import { FormsModule } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios/usuario.service';
import { UsuarioModel } from '../../core/models/usuario.model';
<<<<<<< HEAD
import Swal from 'sweetalert2';
import { PermisosDirective } from '../../core/directives/permisos/permisos.directive';
=======
>>>>>>> db0bf76b35262a94f152f82a251a33d5b088837d

@Component({
    selector: 'app-asignar-oportunidad',
    standalone: true,
    templateUrl: './asignar-oportunidad.component.html',
    styleUrl: './asignar-oportunidad.component.css',
<<<<<<< HEAD
    imports: [TableComponent, ModalComponent, FormsModule, PermisosDirective]
=======
    imports: [TableComponent, ModalComponent, FormsModule]
>>>>>>> db0bf76b35262a94f152f82a251a33d5b088837d
})
export class AsignarOportunidadComponent implements OnInit {
  usuarios: UsuarioModel[] = [];
  oportunidades: OportunidadModel[]=[];
  oportunidad: OportunidadModel | null = null;
  nuevoGestor: string = '';
  modalAbierto: 'modal1' | 'modal2' | null = null;

  constructor(private getOpor: OportunidadService, private userServ: UsuariosService){}

  headNames: string[] = [
<<<<<<< HEAD
    'nameOportunity',
    'descriptionOportunity',
    'stateOportunity',
    'userCreate',
    'userGestor',
    'userCliente',
=======
    'nomOportunidad',
    'descripcion',
    'estado',
    'usuarioCreador',
    'usuarioGestor',
    'usuarioAsignado',
    'interacciones',
>>>>>>> db0bf76b35262a94f152f82a251a33d5b088837d
    'createdAt',
    'updatedAt',
  ];

  headMap: { [key: string]: string } = {
<<<<<<< HEAD
    nameOportunity: 'Nombre',
    descriptionOportunity: 'Descripción',
    stateOportunity: 'Estado',
    userCreate: 'Creado por',
    userGestor: 'Asesor encargado',
    userCliente: 'Cliente',
=======
    nomOportunidad: 'Nombre',
    descripcion: 'Descripción',
    estado: 'Estado',
    usuarioCreador: 'Creado por',
    usuarioGestor: 'Asesor encargado',
    usuarioAsignado: 'Cliente',
    interacciones: 'Numero Interacciones',
>>>>>>> db0bf76b35262a94f152f82a251a33d5b088837d
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
<<<<<<< HEAD
          this.oportunidades = this.transformarOportunidades(resp.oportunidad);
        } else {
          console.error('Error al obtener las oportunidades:', resp.msg);
          Swal.fire({
            title: "Error al obtener las oportunidades",
            icon: "error"
          });
        }
      },
      error: (error) => {
        Swal.fire({
          title: "Error al obtener oportunidades",
          text: error.error.msg,
          icon: "error"
        });
=======
          this.oportunidades = this.transformarOportunidades(resp.oportunidades);
        } else {
          console.error('Error al obtener las oportunidades:', resp.msg);
          // mostrar un mensaje de error al usuario
        }
      },
      error: (error) => {
        console.error('Error al obtener las oportunidades:', error);
        //mostrar un mensaje de error al usuario o tomar otras acciones según sea necesario
>>>>>>> db0bf76b35262a94f152f82a251a33d5b088837d
      }
    });
  }

  transformarOportunidades(oportunidades: any[]): any[] {
    return oportunidades.map((oportunidad) => ({
      ...oportunidad,
<<<<<<< HEAD
      userCreate: oportunidad.userCreate.nombre || '',
      userGestor: oportunidad.userGestor ? (oportunidad.userGestor.nombre || '') : 'Sin gestor',
      userCliente: oportunidad.userCliente.nombre || '',
      createdAt: oportunidad.createdAt ? this.formatDate(oportunidad.createdAt.toString()) : '',
      updatedAt: oportunidad.updateAt ? this.formatDate(oportunidad.updateAt.toString()) : '',
    })).sort((a, b) => a.nameOportunity.localeCompare(b.nameOportunity));
=======
      usuarioCreador: oportunidad.usuarioCreador.nombre || '',
      usuarioGestor: oportunidad.usuarioGestor ? (oportunidad.usuarioGestor.nombre || '') : 'Sin gestor',
      usuarioAsignado: oportunidad.usuarioAsignado.nombre || '',
      interacciones: oportunidad.interacciones.length,
      createdAt: oportunidad.createdAt ? this.formatDate(oportunidad.createdAt.toString()) : '',
      updatedAt: oportunidad.updatedAt ? this.formatDate(oportunidad.updatedAt.toString()) : '',
    })).sort((a, b) => a.nomOportunidad.localeCompare(b.nomOportunidad));
>>>>>>> db0bf76b35262a94f152f82a251a33d5b088837d
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
<<<<<<< HEAD
          Swal.fire({
            title: "No se pudo asignar la oportunidad",
            text: error.error.msg,
            icon: "error"
          });
=======
          console.error('Error al asignar gestor a la oportunidad:', error);
>>>>>>> db0bf76b35262a94f152f82a251a33d5b088837d
          },
      });
    }
  }

  obtenerStaff(): void {
<<<<<<< HEAD
    this.userServ.getUsuariosPorRol('staff').subscribe((data: any) => {
      this.usuarios = data.usuario.filter((usuario: any) => usuario.rol !== 'Supervisor');
    });
  }
  
=======
    this.userServ.getUsuariosPorRol('Staff').subscribe((data: any) => {
      this.usuarios = data.usuarios.filter((usuario: any) => usuario.rol !== 'Supervisor');
    });
  }
  


>>>>>>> db0bf76b35262a94f152f82a251a33d5b088837d
  eliminarOportunidad(oportunidad: OportunidadModel | null): void {
    if (oportunidad?._id) {
        this.getOpor.eliminarOportunidad(oportunidad._id).subscribe({
            next: () => {
                this.obtenerOportunidades();
                this.cerrarModal();
            },
            error: (error) => {
<<<<<<< HEAD
              Swal.fire({
                title: "Error al eliminar oportunidad",
                text: error.error.msg,
                icon: "error"
              });
=======
                console.error('Error al eliminar oportunidad:', error);
>>>>>>> db0bf76b35262a94f152f82a251a33d5b088837d
            },
        });
      }
  }

}
