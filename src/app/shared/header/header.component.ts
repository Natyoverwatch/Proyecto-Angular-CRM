import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import 'flowbite';
import { ModalComponent } from "../../components/modal/modal.component";
import { LoginComponent } from "../../auth/login/login.component";

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
    imports: [RouterLink, ModalComponent, LoginComponent]
})
export class HeaderComponent {

   ifRol: boolean= true;

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
    // Cerrar el modal
    this.isModalOpen = false;
  }
}