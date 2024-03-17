import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios/usuario.service';
import { UsuarioModel } from '../../core/models/usuario.model';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
})
export class RegistroComponent implements OnInit{
  password: string = '';
  showPassword: boolean = false;
  registroForm: FormGroup;

  constructor(private userService: UsuariosService, private fb: FormBuilder){}

  ngOnInit(): void {
    this.regisForm();
  }

  regisForm(): void {
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      tDocumento: ['', [Validators.required]],
      nDocumento: ['', [Validators.required]],
      login: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirm_password: ['', [Validators.required, this.passValidar()]],
    });   
  };

  passValidar() {
    return (control: AbstractControl) => {
      const password = control.root.get('password');
      const confirm_password = control.value;
      if (password && password.value !== confirm_password) {
        return { confirmPassword: true };
      }
      return null;
    };
  }

  crearUsuario() {
    if (this.registroForm.valid) {
      const usuario: UsuarioModel = {
        nombre: this.registroForm.value.nombre,
        direccion: this.registroForm.value.direccion,
        telefono: this.registroForm.value.telefono,
        email: this.registroForm.value.email,
        tDocumento: this.registroForm.value.tDocumento,
        nDocumento: this.registroForm.value.nDocumento,
        login: this.registroForm.value.login,
        password: this.registroForm.value.password,
      };
      this.userService.crearUsuario(usuario).subscribe({
        next: (response: any) => {
          console.log('Usuario creado correctamente', response);
          this.registroForm.reset();
          // si funciona y el form es valido
        },
        error: (error) => {
          console.error('Error al crear usuario', error);
          // sino funciona pero el form es valido
        }
      });
    } else {
      // Si el formulario no es válido
      console.error('Formulario inválido');
    }
  }

  mostrarPass() {
    this.showPassword = !this.showPassword;
  }
}
