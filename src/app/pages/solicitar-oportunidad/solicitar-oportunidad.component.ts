import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OportunidadModel } from '../../core/models/oportunidad.model';
import { OportunidadService } from '../../services/oportunidad/oportunidad.service';
<<<<<<< HEAD
import Swal from 'sweetalert2';
=======
>>>>>>> db0bf76b35262a94f152f82a251a33d5b088837d

@Component({
  selector: 'app-solicitar-oportunidad',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './solicitar-oportunidad.component.html',
  styleUrl: './solicitar-oportunidad.component.css'
})
<<<<<<< HEAD

export class SolicitarOportunidadComponent {
  oportunidad: OportunidadModel = new OportunidadModel('', '', 'Sin gestor', '', null, '');
=======
export class SolicitarOportunidadComponent {
  oportunidad: OportunidadModel = new OportunidadModel('', '', 'Sin gestor', '', null, '', []);
  errorMsg: string | null = null;
>>>>>>> db0bf76b35262a94f152f82a251a33d5b088837d
  @ViewChild('oporForm') form: ElementRef<HTMLFormElement>;

  constructor(private oportunidadService: OportunidadService) {}

  ngOnInit(): void {}

<<<<<<< HEAD
  checkNombreServicio() {
    if (!this.oportunidad.nameOportunity) {
      // Agregar una clase de estilo para resaltar el campo en rojo
      document.getElementById('nombre')?.classList.add('proyecto-invalid-field');
    } else {
      // Si el campo está completo, eliminar la clase de estilo
      document.getElementById('nombre')?.classList.remove('proyecto-invalid-field');
    }
  }

  // Método para verificar y resaltar el campo de la descripción
  checkDescripcion() {
    if (!this.oportunidad.descriptionOportunity) {
      // Agregar una clase de estilo para resaltar el campo en rojo
      document.getElementById('descriptionOportunity')?.classList.add('proyecto-invalid-field');
    } else {
      // Si el campo está completo, eliminar la clase de estilo
      document.getElementById('descriptionOportunity')?.classList.remove('proyecto-invalid-field');
    }
  }

  enviarSolicitud() {
    Swal.fire({
      title: 'Solicitando servicio...',
      allowOutsideClick: false,  
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    const userCliente = JSON.parse(localStorage.getItem('usuario') || '');
    // Verificar si se encontró el usuario asignado
    if (userCliente && userCliente._id) {
      // Asignar la ID del usuario asignado al campo userCreate
      this.oportunidad.userCreate = userCliente._id;  
      // Verificar si userCliente está presente en oportunidad y asignarle un valor válido
      if (!this.oportunidad.userCliente) {
        this.oportunidad.userCliente = userCliente._id;
      }  
      // Envía la solicitud al servicio
      this.oportunidadService.crearOportunidad(this.oportunidad).subscribe({
        next: (resp: any) => {
          Swal.fire({
            title: "Solicitud de servicio creada con exito",
            text: resp.msg,
            icon: "success"
          });
          this.form.nativeElement.reset();
        },
        error: (error) => {
          Swal.fire({
            title: "No se pudo solicitar el servicio",
            text: error.error.msg,
            icon: "error"
          });
        }
=======
  enviarSolicitud() {
    const usuarioAsignado = JSON.parse(localStorage.getItem('usuario') || '');

    // Verificar si se encontró el usuario asignado
    if (usuarioAsignado && usuarioAsignado._id) {
      // Asignar la ID del usuario asignado al objeto oportunidad
      this.oportunidad.usuarioAsignado = usuarioAsignado._id;
    
      // Envía la solicitud al servicio
      this.oportunidadService.crearOportunidad(this.oportunidad).subscribe({
        next: (resp) => {
          console.log('Solicitud de oportunidad enviada con éxito:', resp);
          this.form.nativeElement.reset();
        },
        error: (error) => {
          console.error('Error al enviar la solicitud de oportunidad:', error);
          if (error.error && error.error.msg) {
              this.errorMsg = error.error.msg;
          } else {
              this.errorMsg = 'Ocurrió un error al enviar la solicitud. Por favor, inténtalo de nuevo más tarde.';
          }
      }
>>>>>>> db0bf76b35262a94f152f82a251a33d5b088837d
      });
    } else {
      console.error('Usuario asignado no encontrado en el localStorage');
    }
  }
<<<<<<< HEAD
  
=======

>>>>>>> db0bf76b35262a94f152f82a251a33d5b088837d
}
