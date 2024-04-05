import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from '../../components/table/table.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { BaseUsuariosComponent } from '../../components/base-usuarios/base-usuarios.component';
<<<<<<< HEAD
import { PermisosDirective } from '../../core/directives/permisos/permisos.directive';
=======
>>>>>>> db0bf76b35262a94f152f82a251a33d5b088837d

@Component({
  selector: 'app-usuarios',
  standalone: true,
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
<<<<<<< HEAD
  imports: [TableComponent, ReactiveFormsModule, ModalComponent, FormsModule, PermisosDirective],
=======
  imports: [TableComponent, ReactiveFormsModule, ModalComponent, FormsModule],
>>>>>>> db0bf76b35262a94f152f82a251a33d5b088837d
})

export class UsuariosComponent extends BaseUsuariosComponent{

  override obtenerUsuarios(): void {
    this.userServ.getUsuarios().subscribe((data: any) => {
      this.usuarios = this.transformarUsuarios(data.usuarios);
    });
  }

}
