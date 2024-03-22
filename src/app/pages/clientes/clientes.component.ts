import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from "../../components/table/table.component";
import { ModalComponent } from "../../components/modal/modal.component";
import { BaseUsuariosComponent } from '../../components/base-usuarios/base-usuarios.component';

@Component({
    selector: 'app-clientes',
    standalone: true,
    templateUrl: './clientes.component.html',
    styleUrl: './clientes.component.css',
    imports: [TableComponent, ModalComponent, ReactiveFormsModule, FormsModule]
})
export class ClientesComponent extends BaseUsuariosComponent{

  override obtenerUsuarios(): void {
    this.userServ.getUsuariosPorRol('Cliente').subscribe((data: any) => {
      this.usuarios = this.transformarUsuarios(data.usuarios);
    });
  }
 

}
