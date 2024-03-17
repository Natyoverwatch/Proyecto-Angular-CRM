import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AutenticacionService } from '../../services/autenticacion/autenticacion.service';
import { tap } from 'rxjs';
import { ROUTER_APP } from '../../core/enum/router-app.enum';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AutenticacionService);
  const router = inject(Router);

  return authService.validateToken().pipe(
    tap((isAutenticado) => {
      if (!isAutenticado) {
        router.navigateByUrl(ROUTER_APP.INICIO);
      }
    })
  );
};
