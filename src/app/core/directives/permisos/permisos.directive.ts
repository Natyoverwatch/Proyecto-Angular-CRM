import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AutenticacionService } from '../../../services/autenticacion/autenticacion.service';
import { Subject, merge } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[appPermisos]',
  standalone: true,
})
export class PermisosDirective implements OnInit, OnDestroy {
  @Input('appPermisos') permisos: string[];

  private unsubscribe = new Subject<void>();

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private autenticacionService: AutenticacionService
  ) {}

  ngOnInit(): void {
    // Combinar los observables onLogin y onLogout en uno solo
    const loginLogoutObservable = merge(
      this.autenticacionService.onLogin,
      this.autenticacionService.onLogout
    );

    // Suscribirse al observable combinado
    loginLogoutObservable.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
      this.actualizarVista();
    });

    // Actualizar la vista al inicializar la directiva
    this.actualizarVista();
  }

  ngOnDestroy(): void {
    // Desuscribirse cuando se destruye la directiva
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  private actualizarVista(): void {
    this.autenticacionService
      .getUsuarioActual()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((usuario) => {
        if (usuario && usuario.rol) {
          if (this.validarPermisos(usuario.rol)) {
            this.viewContainer.createEmbeddedView(this.templateRef);
          } else {
            this.viewContainer.clear();
          }
        } else {
          this.viewContainer.clear();
        }
      });
  }

  private validarPermisos(rol: string): boolean {
    return this.permisos.some((permiso) => permiso === rol.toUpperCase());
  }
}
