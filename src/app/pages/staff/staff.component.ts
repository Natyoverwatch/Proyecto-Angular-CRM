import { Component } from '@angular/core';
import { BaseUsuariosComponent } from '../../components/base-usuarios/base-usuarios.component';
import { TableComponent } from "../../components/table/table.component";
import { ModalComponent } from "../../components/modal/modal.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-staff',
    standalone: true,
    templateUrl: './staff.component.html',
    styleUrl: './staff.component.css',
    imports: [TableComponent, ModalComponent, FormsModule, ReactiveFormsModule]
})
export class StaffComponent extends BaseUsuariosComponent {

  override obtenerUsuarios(): void {
    this.userServ.getUsuariosPorRol('Staff').subscribe((data: any) => {
      this.usuarios = this.transformarUsuarios(data.usuarios);
    });
  }

}
