import { Routes } from '@angular/router';
import { Home } from './pages/public/home/home';
import { Login } from './pages/public/login/login';
import { Register } from './pages/public/register/register';
import { Products } from './pages/private/products/products';
import { ProductNewFrom } from './pages/private/products/new-from/new-from';

export const routes: Routes = [ 
    { path: 'home', component: Home },
    { path: 'login', component: Login},
    { path:'register', component: Register},
    { path: 'dashboard/products', component: Products},
    { path: 'dashboard/products/new', component: ProductNewFrom},
    { path: '**', redirectTo: 'home',pathMatch: 'full'},
    { path: '', redirectTo: 'home',pathMatch: 'full'}
];
