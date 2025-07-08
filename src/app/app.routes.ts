import { Routes } from '@angular/router';
import { Home  } from './pages/public/home/home';
import { Login } from './pages/public/login/login';
import { Register } from './pages/public/register/register';
import { Users } from './pages/private/users/users';
import { CategoryForm } from './pages/private/category/category-form/category-form';
import { Category } from './pages/private/category/category';
import { Products } from './pages/private/products/products';
import { Dashboard } from './pages/private/dashboard/dashboard';
import { authGuard } from './guards/auth-guard';
import { ProductNewForm } from './pages/private/products/new-form/new-form';
export const routes: Routes = [
    { path: 'home', component: Home },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
    { path: 'dashboard/categories', component: Category },
    { path: 'dashboard/categories/new', component: CategoryForm },
    { path: 'dashboard/products', component: Products },
    { path: 'dashboard/products/new', component: ProductNewForm },
    { path: 'dashboard/users', component: Users,},
    { path: 'dashboard/users/new', component: ProductNewForm,},
    { path: '**', redirectTo: 'home', pathMatch: 'full' },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
]
