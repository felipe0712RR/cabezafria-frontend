import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { catchError, map, of,} from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject( AuthService );
  const router = inject( Router );

  // TODO: Mejorar el Servicio y eliminar la redireccion en el error del LoginComponent 
  return authService.verifyAuthenticateUser()
  .pipe
  (
      map( ( data ) => {
        console.log( 'Guard',data );

        if( ! data ) {
          router.navigateByUrl( 'register' )
          return false;
        }

        return true;
      } ),
      catchError( () => {
        router.navigateByUrl( 'register' )
        return of( false );
      })
    )
    
  
  
};
