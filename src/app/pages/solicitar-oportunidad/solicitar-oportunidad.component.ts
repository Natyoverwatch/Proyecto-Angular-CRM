import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OportunidadModel } from '../../core/models/oportunidad.model';
import { OportunidadService } from '../../services/oportunidad/oportunidad.service';

@Component({
  selector: 'app-solicitar-oportunidad',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './solicitar-oportunidad.component.html',
  styleUrl: './solicitar-oportunidad.component.css'
})
export class SolicitarOportunidadComponent {
  oportunidad: OportunidadModel = new OportunidadModel('', '', 'Sin gestor', '', null, '', []);
  errorMsg: string | null = null;
  @ViewChild('oporForm') form: ElementRef<HTMLFormElement>;

  constructor(private oportunidadService: OportunidadService) {}

  ngOnInit(): void {}

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
      });
    } else {
      console.error('Usuario asignado no encontrado en el localStorage');
    }
  }

}
