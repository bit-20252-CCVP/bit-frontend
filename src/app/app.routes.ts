import { Routes } from '@angular/router';
import { Home } from './componentes/paginas/home/home';
import { Dashboard } from './componentes/paginas/dashboard/dashboard';
import { authGuard } from './guards/auth.guard';
import { loginRedirectGuard } from './guards/login-redirect.guard';
import { SignUp } from './componentes/paginas/sign-up/sign-up';
import { SignIn } from './componentes/paginas/sign-in/sign-in';
import { PagesNotFound } from './componentes/paginas/pages-not-found/pages-not-found';

export const routes: Routes = [
    {path: 'home', component: Home, title: 'Home | SPA Aplicacion inventarios'},
    {path: 'dashboard', component: Dashboard, title: 'Dashboard | SPA', canActivate: [authGuard]},
    {path: 'sign-up', component: SignUp, title: 'Sign Up | SPA', canActivate: [loginRedirectGuard]},
    {path: 'sign-in', component: SignIn, title: 'Sign In | SPA', canActivate: [loginRedirectGuard]},
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: '**', component: PagesNotFound, title: 'Error 404 | SPA'},
];


