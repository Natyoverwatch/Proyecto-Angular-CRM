import { Component } from '@angular/core';
import 'flowbite';

@Component({
  selector: 'app-header-admin',
  standalone: true,
  imports: [],
  templateUrl: './header-admin.component.html',
  styleUrl: './header-admin.component.css',
})
export class HeaderAdminComponent {
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
  //Inicio codigo modal
  isModalOpen = false;

  aModal() {
    this.isModalOpen = true;
  }

  cModal() {
    this.isModalOpen = false;
  }
  //fin codigo modal
}
