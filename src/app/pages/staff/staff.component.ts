import { Component } from '@angular/core';
import { BaseUsuariosComponent } from '../../components/base-usuarios/base-usuarios.component';
import { TableComponent } from "../../components/table/table.component";
import { ModalComponent } from "../../components/modal/modal.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
<<<<<<< HEAD
import { PermisosDirective } from '../../core/directives/permisos/permisos.directive';
=======
>>>>>>> db0bf76b35262a94f152f82a251a33d5b088837d

@Component({
    selector: 'app-staff',
    standalone: true,
    templateUrl: './staff.component.html',
    styleUrl: './staff.component.css',
<<<<<<< HEAD
    imports: [TableComponent, ModalComponent, FormsModule, ReactiveFormsModule, PermisosDirective]
})

export class StaffComponent extends BaseUsuariosComponent {

  override obtenerUsuarios(): void {
    this.userServ.getUsuariosPorRol('staff').subscribe((data: any) => {
      this.usuarios = this.transformarUsuarios(data.usuario);
=======
    imports: [TableComponent, ModalComponent, FormsModule, ReactiveFormsModule]
})
export class StaffComponent extends BaseUsuariosComponent {

  override obtenerUsuarios(): void {
    this.userServ.getUsuariosPorRol('Staff').subscribe((data: any) => {
      this.usuarios = this.transformarUsuarios(data.usuarios);
>>>>>>> db0bf76b35262a94f152f82a251a33d5b088837d
    });
  }

}
