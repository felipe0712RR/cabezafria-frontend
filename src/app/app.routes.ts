import { Routes } from '@angular/router';
import { Home } from './pages/public/home/home';
import { Login } from './pages/public/login/login';
import { Register } from './pages/public/register/register';

export const routes: Routes = [ 
    { path: 'home', component: Home },
    { path: 'login', component: Login},
    { path:'registe', component: Register},
    { path: '**', redirectTo: 'home',pathMatch: 'full'},
    { path: '', redirectTo: 'home',pathMatch: 'full'}
];
