import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const jwtHelper = new JwtHelperService();
  const token = localStorage.getItem('token');

  if (token && !jwtHelper.isTokenExpired(token)) {
    return true;
  } else {
    router.navigateByUrl('/sign-in');
    return false;
  }
};