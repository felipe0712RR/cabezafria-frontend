import { Routes } from '@angular/router';
import { Home } from './pages/public/home/home';
import { Login } from './pages/public/login/login';
import { Register } from './pages/public/register/register';
import { Category } from './pages/private/category/category';
import { NewForm } from './pages/private/new-form/new-form';

export const routes: Routes = [ 
    { path: 'home', component: Home },
    { path: 'login', component: Login},
    { path:'register', component: Register},
    { path: 'dashboard/category', component: Category },
    { path: 'dashboard/new-form', component: NewForm },
    { path: '**', redirectTo: 'home',pathMatch: 'full'},
    { path: '', redirectTo: 'home',pathMatch: 'full'}
];
