import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, take, tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  
  return auth.userState$.pipe(
    take(1),
//    tap((user) => !!user ? true : router.createUrlTree(['login'])),
    map(user => !!user || router.createUrlTree(['login'])) 
  );
};
