import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AutenticacionService } from '../../../services/autenticacion/autenticacion.service';

@Directive({
  selector: '[appPermisos]',
  standalone: true
})
export class PermisosDirective {

  @Input('appPermisos') permisos: string[];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private autenticacionService: AutenticacionService
  ) {}

  ngOnInit(): void {
    this.actualizarVista();
  }

  private actualizarVista(): void {
    this.autenticacionService.getUsuarioActual().subscribe(usuario => {
      if (usuario && usuario.rol) {
        if (this.validarPermisos(usuario.rol)) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      }
    });
  }

  private validarPermisos(rol: string): boolean {
    return this.permisos.some(permiso => permiso === rol.toUpperCase());
  }

}
