import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutenticacionService } from '../../services/autenticacion/autenticacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  @Output() loginSuccess = new EventEmitter<void>();
  
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, 
    private autenticacionService: AutenticacionService,
    private router: Router
    ){ }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      login: ["", [Validators.required]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });    
  }

  get login(){
    return this.loginForm.get(`login`);
  }
  get password(){
    return this.loginForm.get(`password`);
  }

  realizoLogin(){
    if(this.loginForm.invalid){
      return;
    }

    const data = this.loginForm.value;

    this.autenticacionService.login(data).subscribe({
      next: (resp: any) => {
        if (resp && resp.usuario) {
          const { nombre, login, email } = resp.usuario;
          this.router.navigateByUrl('');
          this.loginSuccess.emit();
          /* Swal.fire({
            html: `Bienvenido ${nombre}`,
          }).then(() => {
            this.router.navigateByUrl('');
          });
          this.loginSuccess.emit(); */
        }
      },
      error: (error: any) => {
        console.error(error.error.msg);
      },
    });
  }
}