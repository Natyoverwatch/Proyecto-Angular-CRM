import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AutenticacionService } from '../../services/autenticacion/autenticacion.service';
import { ModalComponent } from '../../components/modal/modal.component';
import { Router } from '@angular/router';
<<<<<<< HEAD
import Swal from 'sweetalert2';
=======
>>>>>>> db0bf76b35262a94f152f82a251a33d5b088837d

@Component({
  selector: 'app-recuperar',
  standalone: true,
  templateUrl: './recuperar.component.html',
  styleUrl: './recuperar.component.css',
  imports: [ReactiveFormsModule, ModalComponent],
})
export class RecuperarComponent implements OnInit, OnDestroy {
  formularioRecuperacion: FormGroup;
  newPassForm: FormGroup;
  tiempoExpiracion: number = 0;
  contador: any;

  constructor(
    private formBuilder: FormBuilder,
    private autenticacionService: AutenticacionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.recuperacionForm();
    this.cambioForm();
  }

  ngOnDestroy() {
    localStorage.removeItem('x-token-pass');
  }

  recuperacionForm() {
    this.formularioRecuperacion = this.formBuilder.group({
<<<<<<< HEAD
      email: ['', Validators.required],
      numeroDocumento: ['', Validators.required],
=======
      login: ['', Validators.required],
      nDocumento: ['', Validators.required],
>>>>>>> db0bf76b35262a94f152f82a251a33d5b088837d
    });
  }

  onSubmit() {
    if (this.formularioRecuperacion.valid) {
<<<<<<< HEAD
      const { email, numeroDocumento } = this.formularioRecuperacion.value;
      this.autenticacionService
        .recuperarContraseña(email, numeroDocumento)
=======
      const { login, nDocumento } = this.formularioRecuperacion.value;
      this.autenticacionService
        .recuperarContraseña(login, nDocumento)
>>>>>>> db0bf76b35262a94f152f82a251a33d5b088837d
        .subscribe({
          next: (resp: any) => {
            if (resp.token) {
              localStorage.setItem('x-token-pass', resp.token);
              const tiempoExpiracion = resp.tiempoExpiracion; // Tiempo de expiración del token en segundos
              this.iniciarContador(tiempoExpiracion);
              this.openModal();
              console.log('Token de recuperación generado:', resp.token);
            } else {
              console.error(
                'Error al recuperar la contraseña. Por favor, inténtalo de nuevo.'
              );
            }
          },
          error: (error: any) => {
<<<<<<< HEAD
            Swal.fire({
              title: "Error en la solicitud",
              text: error.error.msg,
              icon: "error"
            });
          },
        });
    } else {
      Swal.fire({
        title: "formulario invalido, por favor rellene bien los campos",
        icon: "warning"
      });
=======
            console.error(
              'Error en la solicitud de recuperación de contraseña:',
              error
            );
            // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
          },
        });
    } else {
      console.error(
        'Formulario no válido. Por favor, complete todos los campos.'
      );
      // Si el formulario no es válido, puedes mostrar mensajes de error o realizar otras acciones
>>>>>>> db0bf76b35262a94f152f82a251a33d5b088837d
    }
  }

  iniciarContador(tiempoExpiracion: number) {
    this.contador = setInterval(() => {
      if (tiempoExpiracion > 0) {
        tiempoExpiracion--;
        this.tiempoExpiracion = tiempoExpiracion; 
      } else {
        clearInterval(this.contador);
        console.log('El tiempo de expiración del token ha llegado a cero.');
      }
    }, 1000); 
  }

  formatoTiempo(tiempo: number): string {
    const minutos = Math.floor(tiempo / 60);
    const segundos = tiempo % 60;
    return `${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
  }

  cambioForm() {
    this.newPassForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmarContrasena: ['', Validators.required],
    });
  }

  onSubmitNewPassForm() {
    if (this.newPassForm.valid) {
      const nuevaContrasena = this.newPassForm.get('password')?.value; // Cambiado a 'password'
      const confirmarContrasena = this.newPassForm.get(
        'confirmarContrasena'
      )?.value;
      if (nuevaContrasena === confirmarContrasena) {
        this.autenticacionService.cambiarContraseña(nuevaContrasena).subscribe({
<<<<<<< HEAD
          next: () => {
            Swal.fire({
              title: "Nueva contraseña establecida",
              icon: "success"
            });
=======
          next: (response: any) => {
            console.log('Respuesta del servidor:', response);
>>>>>>> db0bf76b35262a94f152f82a251a33d5b088837d
            this.onModalClose();
            this.router.navigate(['']);
            localStorage.removeItem('x-token-pass');
          },
          error: (error: any) => {
<<<<<<< HEAD
            Swal.fire({
              title: "No se pudo ingresar la nueva contraseña",
              text: error.error.msg,
              icon: "error"
            });
          },
        });
      } else {
        Swal.fire({
          title: "las contraseñas deben coincidir",
          icon: "warning"
        });
      }
    } else {
      Swal.fire({
        title: "completa el formulario adecuadamente",
        icon: "error"
      });
=======
            console.error(
              'Error en la solicitud de cambio de contraseña:',
              error
            );
          },
        });
      } else {
        console.error(
          'Las contraseñas no coinciden. Por favor, inténtalo de nuevo.'
        );
      }
    } else {
      console.error(
        'Formulario no válido. Por favor, complete todos los campos correctamente.'
      );
>>>>>>> db0bf76b35262a94f152f82a251a33d5b088837d
    }
  }

  //modalReutilizable
  isModalOpen: boolean = false;
  openModal() {
    this.isModalOpen = true;
  }
  onModalClose() {
    this.isModalOpen = false;
    clearInterval(this.contador);
    localStorage.removeItem('x-token-pass');
  }
}
