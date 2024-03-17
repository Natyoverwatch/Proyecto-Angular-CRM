import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ModalComponent } from '../../components/modal/modal.component';
import { LoginComponent } from '../../auth/login/login.component';
import { PermisosDirective } from '../../core/directives/permisos/permisos.directive';
import { AutenticacionService } from '../../services/autenticacion/autenticacion.service';
import 'flowbite';
import { UsuarioModel } from '../../core/models/usuario.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [RouterLink, ModalComponent, LoginComponent, PermisosDirective],
})

export class HeaderComponent implements OnInit, OnDestroy {
  permisos: string[] = [];
  usuario: UsuarioModel | null;
  usuarioLogueado: boolean = false;
  private unsubscribe = new Subject<void>();

  constructor(private auth: AutenticacionService) {}

  ngOnInit(): void {
    this.actualizarPermisos();
    this.verificarEstadoLogin();

    this.auth.onLogin.pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(() => {
      this.actualizarPermisos();
      this.verificarEstadoLogin();
    });
    this.auth.onLogout.pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(() => {
      // Limpiar datos relacionados con la sesión al cerrar sesión
      this.usuario = null;
      this.usuarioLogueado = false;
      this.permisos = [];
    });;
  }

  ngOnDestroy(): void {
    // Desuscribirse cuando se destruye el componente
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  actualizarPermisos(): void {
    this.auth.getUsuarioActual().subscribe((usuario) => {
      if (usuario && usuario.rol) {
        this.permisos = [usuario.rol];
      } else {
        this.permisos = [];
      }
    });
  }

  verificarEstadoLogin() {
    this.auth.getUsuarioActual().subscribe((usuario: UsuarioModel | null) => {
      if (usuario) {
        this.usuario = usuario;
        this.usuarioLogueado = true;
      } else {
        this.usuario = null;
        this.usuarioLogueado = false;
        this.permisos = [];
      }
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
    this.isModalOpen = false;
  }

  cerrarSesion(){
    this.auth.logout();
  }
}