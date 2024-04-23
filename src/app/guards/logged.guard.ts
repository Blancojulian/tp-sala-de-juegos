import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import Swal from 'sweetalert2';

export const loggedGuard: CanActivateFn = async (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  
  if (auth.isLoggedIn()) {
    await Swal.fire({
      title: 'Mensaje',
      text: 'Usuario ya se encuentra logueado',
      heightAuto: false
    });
    return router.createUrlTree(['quien-soy']);
  }
  return true;
};
