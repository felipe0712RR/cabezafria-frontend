import { Routes } from '@angular/router';
import { Home } from './pages/public/home/home';
import { Login } from './pages/public/login/login';
import { Register } from './pages/public/register/register';
import { CategoryForm } from './pages/private/category/category-form/category-form';
import { Category } from './pages/private/category/category';
import { ProductNewFrom } from './pages/private/new-form/new-form';
import { Products } from './pages/private/products/products';


export const routes: Routes = [
    { path: 'home', component: Home },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'dashboard/categories', component: CategoryForm },
    { path: 'dashboard/categories/new', component: CategoryForm },
    { path: 'dashboard/new-form', component: ProductNewFrom },
    { path: 'register', component: Register },
    { path: 'dashboard/products', component: Products },
    { path: 'dashboard/products/new', component: ProductNewFrom },
    { path: '**', redirectTo: 'home', pathMatch: 'full' },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];
