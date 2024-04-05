<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PermisosDirective } from '../../core/directives/permisos/permisos.directive';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactoService } from '../../services/contacto/contacto.service';
import Swal from 'sweetalert2';
=======
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PermisosDirective } from '../../core/directives/permisos/permisos.directive';
>>>>>>> db0bf76b35262a94f152f82a251a33d5b088837d

@Component({
  selector: 'app-home',
  standalone: true,
<<<<<<< HEAD
  imports: [RouterLink, PermisosDirective, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {

  formularioContacto: FormGroup;

  constructor(private formBuilder: FormBuilder, private contactoService: ContactoService) {}

  ngOnInit() {
    this.inicializarFormulario();
  }

  inicializarFormulario() {
    this.formularioContacto = this.formBuilder.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mensaje: ['', Validators.required]
    });
  }

  onSubmit() {  
    Swal.fire({
      title: 'Enviando informacion de contacto...',
      allowOutsideClick: false,  
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    
    if (this.formularioContacto.valid) {    
      this.contactoService.enviarFormularioContacto(this.formularioContacto.value)
        .subscribe({
          next: () => {            
            Swal.fire({
              title: "Solicitud de contacto enviada",
              text: 'Nuestro equipo se contactará contigo en cuanto reciba la notificación',
              icon: "success"
            });
            this.formularioContacto.reset();
          },
          error: (error) => {           
            Swal.fire({
              title: "No se pudo enviar el formulario",
              text: error.error.msg,
              icon: "error"
            });
            this.formularioContacto.reset();
          }
        });
    } else {
      console.log('Formulario inválido');
    }
  }  

=======
  imports: [RouterLink, PermisosDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
>>>>>>> db0bf76b35262a94f152f82a251a33d5b088837d
}