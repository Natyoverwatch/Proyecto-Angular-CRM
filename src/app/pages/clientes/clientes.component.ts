<<<<<<< HEAD
import { Component} from '@angular/core';
=======
import { Component, OnInit } from '@angular/core';
>>>>>>> db0bf76b35262a94f152f82a251a33d5b088837d
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from "../../components/table/table.component";
import { ModalComponent } from "../../components/modal/modal.component";
import { BaseUsuariosComponent } from '../../components/base-usuarios/base-usuarios.component';
<<<<<<< HEAD
import { PermisosDirective } from '../../core/directives/permisos/permisos.directive';
=======
>>>>>>> db0bf76b35262a94f152f82a251a33d5b088837d

@Component({
    selector: 'app-clientes',
    standalone: true,
    templateUrl: './clientes.component.html',
    styleUrl: './clientes.component.css',
<<<<<<< HEAD
    imports: [TableComponent, ModalComponent, ReactiveFormsModule, FormsModule, PermisosDirective]
=======
    imports: [TableComponent, ModalComponent, ReactiveFormsModule, FormsModule]
>>>>>>> db0bf76b35262a94f152f82a251a33d5b088837d
})
export class ClientesComponent extends BaseUsuariosComponent{

  override obtenerUsuarios(): void {
    this.userServ.getUsuariosPorRol('Cliente').subscribe((data: any) => {
<<<<<<< HEAD
      this.usuarios = this.transformarUsuarios(data.usuario);
=======
      this.usuarios = this.transformarUsuarios(data.usuarios);
>>>>>>> db0bf76b35262a94f152f82a251a33d5b088837d
    });
  }
 

}
