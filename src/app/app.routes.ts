import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { loggedGuard } from './guards/logged.guard';
import { authGuard } from './guards/auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { TatetiComponent } from './components/tateti/tateti.component';
import { MemotestComponent } from './components/memotest/memotest.component';
import { PiedraPapelTijeraComponent } from './components/piedra-papel-tijera/piedra-papel-tijera.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent: () => import('./components/home/home.component').then(m=> m.HomeComponent)
    },
    {
        path: 'login',
        canActivate: [loggedGuard],
        loadComponent: () => import('./components/login/login.component').then(m=> m.LoginComponent),
    },
    {
        path: 'register',
        canActivate: [loggedGuard],
        loadComponent: () => import('./components/register/register.component').then(m=> m.RegisterComponent),
        
    },
    {
        path: 'quien-soy',
        //canActivate: [authGuard],
        loadComponent: () => import('./components/quien-soy/quien-soy.component').then(m=> m.QuienSoyComponent),
        
    },
    {
        path: 'chat',
        canActivate: [authGuard],
        loadChildren: () => import('./pages/chat/chat.module').then(m => m.ChatModule)
    },
    {
        path: 'juegos',
        canActivate: [authGuard],
        children: [
            {
                path: 'carreras',
                loadChildren: () => import('./juegos/carreras/carreras.module').then(m => m.CarrerasModule)
            },
            {
                path: 'ahorcado',
                loadChildren: () => import('./juegos/ahorcado/ahorcado.module').then(m => m.AhorcadoModule)
            },
            {
                path: 'mayor-menor',
                loadChildren: () => import('./juegos/mayor-menor/mayor-menor.module').then(m => m.MayorMenorModule)
            },
            {
                path: 'tateti',
                loadComponent: () => import('./components/tateti/tateti.component').then(m=> m.TatetiComponent),  
            },
            {
                path: 'memotest',
                loadComponent: () => import('./components/memotest/memotest.component').then(m=> m.MemotestComponent),  
            },
            {
                path: 'piedra-papel-tijera',
                loadComponent: () => import('./components/piedra-papel-tijera/piedra-papel-tijera.component').then(m=> m.PiedraPapelTijeraComponent),  
            },
        ]
    },
    {
        path: '**',
        loadComponent: () => import('./components/not-found/not-found.component').then(m=> m.NotFoundComponent)
    },
];
