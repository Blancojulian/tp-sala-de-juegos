import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { loggedGuard } from './guards/logged.guard';
import { authGuard } from './guards/auth.guard';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'login',
        canActivate: [loggedGuard],
        component: LoginComponent
    },
    {
        path: 'register',
        canActivate: [loggedGuard],
        component: RegisterComponent
    },
    {
        path: 'quien-soy',
        component: QuienSoyComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    },
];
