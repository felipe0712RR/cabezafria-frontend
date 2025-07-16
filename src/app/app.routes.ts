import { Routes } from '@angular/router';
import { Home } from './pages/public/home/home';
import { LoginUser } from './pages/public/login/login';
import { CreateNewUser } from './pages/public/register/register';
import { AdminDashboard } from './pages/private/dashboard/dashboard';
import { GetCategories } from './pages/private/category/get-categories';
import { CreateNewCategory } from './pages/private/category/new-category/new-category';
import { GetProducts } from './pages/private/products/get-products';
import { CreateNewProduct } from './pages/private/products/new-product/new-product';
import { GetUsers } from './pages/private/users/get-users';
import { authGuard } from './guards/auth-guard';
import { roleGuard } from './guards/role-guard';



export const routes: Routes = [
    { path: 'home', component: Home },
    { path: 'login', component: LoginUser },
    { path: 'register', component: CreateNewUser },
    { path: 'dashboard', component: AdminDashboard, canActivate: [authGuard, roleGuard], data: { expectedRoles: ['Administrador'] } },
    { path: 'dashboard/categories/new', loadChildren: () => import('./pages/private/category/new-category/new-category').then(m => m.CreateNewCategory) },
    { path: 'dashboard/products/new', loadChildren: () => import('./pages/private/products/new-product/new-product').then(m => m.CreateNewProduct) },
    { path: 'dashboard/users', loadChildren: () => import('./pages/private/users/get-users').then(m => m.GetUsers) },
    //{ path: 'page4', loadChildren: () => import('./pages/page4/page4.module').then(m => m.Page4Module) },
    //{ path: 'page5', loadChildren: () => import('./pages/page5/page5.module').then(m => m.Page5Module) },
   // { path: 'page6', loadChildren: () => import('./pages/page6/page6.module').then(m => m.Page6Module) },
    { path: 'dashboard/categories', component: GetCategories },
    { path: 'dashboard/categories/new', component: CreateNewCategory, canActivate: [authGuard, roleGuard], data: { expectedRoles: ['Administrador'] } },
    { path: 'dashboard/products', component: GetProducts },
    { path: 'dashboard/products/new', component: CreateNewProduct, canActivate: [authGuard, roleGuard], data: { expectedRoles: ['Administrador'] } },
    { path: 'dashboard/users', component: GetUsers, canActivate: [authGuard, roleGuard], data: { expectedRoles: ['Administrador'] }},
    { path: '**', redirectTo: 'home', pathMatch: 'full' },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
]



