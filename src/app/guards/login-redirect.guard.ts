import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

export const loginRedirectGuard: CanActivateFn = () => {
  const router = inject(Router);
  const jwtHelper = new JwtHelperService();
  const token = localStorage.getItem('token');

  if (token && !jwtHelper.isTokenExpired(token)) {
    // Usuario ya logueado → redirigir al dashboard
    router.navigateByUrl('/dashboard');
    return false;
  }

  // No hay sesión → permitir acceso
  return true;
};