import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { catchError, map, take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

export const authGuard: CanActivateFn = (
  route,
  state
): Observable<boolean | UrlTree> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn$.pipe(
    take(1), // Toma el valor actual y completa
    map(isLoggedIn => {
      if (isLoggedIn) {
        console.log('AuthGuard: Usuario autenticado. Acceso permitido.');
        return true;
      } else {
        console.warn('AuthGuard: Usuario no autenticado. Redirigiendo a login.');
        return router.createUrlTree(['/login']); // Redirige al login
      }
    }),
    catchError(error=>{
      return of (false)
    })
  );
};