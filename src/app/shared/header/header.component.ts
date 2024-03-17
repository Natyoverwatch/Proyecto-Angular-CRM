import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ModalComponent } from '../../components/modal/modal.component';
import { LoginComponent } from '../../auth/login/login.component';
import { PermisosDirective } from '../../core/directives/permisos/permisos.directive';
import { AutenticacionService } from '../../services/autenticacion/autenticacion.service';
import 'flowbite';
import { UsuarioModel } from '../../core/models/usuario.model';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [RouterLink, ModalComponent, LoginComponent, PermisosDirective],
})

export class HeaderComponent implements OnInit {
  permisos: string[] = [];
  usuario: UsuarioModel;
  usuarioLogueado: boolean = false;

  constructor(private auth: AutenticacionService) {}

  ngOnInit(): void {
    this.actualizarPermisos();
    this.verificarEstadoLogin();
  }

  actualizarPermisos(): void {
    this.auth.getUsuarioActual().subscribe((usuario) => {
      if (usuario && usuario.rol) {
        this.permisos = [usuario.rol];
        console.log('permisos', this.permisos);
      } else {
        this.permisos = [];
      }
    });
  }

  verificarEstadoLogin() {
    this.auth.getUsuarioActual().subscribe((usuario: UsuarioModel) => {
      this.usuario = usuario;
      this.usuarioLogueado = usuario ? true : false;
    });
  }

  iconos: string[] = [
    './assets/avatar/cat.png',
    './assets/avatar/cow.png',
    './assets/avatar/dog.png',
    './assets/avatar/elep.png',
    './assets/avatar/fish.png',
    './assets/avatar/giraffe.png',
    './assets/avatar/monkey.png',
    './assets/avatar/pig.png',
    './assets/avatar/snake.png',
    './assets/avatar/toucan.png',
  ];
  randomIndex = Math.floor(Math.random() * this.iconos.length);

  //submenus-Admin
  // Variable para habilitar los sub menús
  showHistory = false;
  showClients = false;
  // Funcion para los submenús
  toggleSubMenu(entrada: string): void {
    if (entrada === 'clients') {
      this.showClients = !this.showClients;
    } else if (entrada === 'history') {
      this.showHistory = !this.showHistory;
    }
  }
  // Funcion para los el bg de los botones del navbar
  isButtonActive: boolean = false;
  isButtonActivePerson: boolean = false;

  toggleButton() {
    this.isButtonActive = !this.isButtonActive;
  }
  toggleButtonPerson() {
    this.isButtonActivePerson = !this.isButtonActivePerson;
    console.log('toggleButtonPerson() ejecutada');
  }

  //modalReutilizable
  isModalOpen: boolean = false;
  openModal() {
    this.isModalOpen = true;
  }
  onModalClose() {
    this.isModalOpen = false;
  }

  //menupeque
  isMobileMenuOpen: boolean = false;
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  onLoginSuccess() {
    // Cerrar el modal
    this.isModalOpen = false;
  }
}