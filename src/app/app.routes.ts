import { Routes } from '@angular/router';
import { Home } from './pages/public/home/home';
import { LoginUser } from './pages/public/login/login';
import { CreateNewUser } from './pages/public/register/register';
import { AdminDashboard } from './pages/private/dashboard/dashboard';
import { GetCategories } from './pages/private/category/get-categories';
import { CreateNewCategory } from './pages/private/category/new-category/new-category';
import { GetProductsAdmin } from './pages/private/products/get-products-admin';
import { CreateNewProduct } from './pages/private/products/new-product/new-product';
import { GetUsers } from './pages/private/users/get-users';
import { authGuard } from './guards/auth-guard';
import { roleGuard } from './guards/role-guard';
import { CardsProducts } from './pages/public/cardsProducts/cardsProducts';
import { Checkout } from './pages/public/checkout/checkout';
import { NewReviews } from './pages/private/reviews/new-reviews/new-reviews';
import { UserProfile } from './pages/private/user-profile/user-profile';
//import { ProductCardComponent } from './pages/public/individualCardProduct/individualCardProduct';



export const routes: Routes = [
    { path: 'home', component: Home },
    { path: 'login', component: LoginUser },
    { path: 'register', component: CreateNewUser },
    { path: 'dashboard', component: AdminDashboard, canActivate: [authGuard, roleGuard], data: { expectedRoles: ['Administrador'] } },
    { path: 'dashboard/categories', component: GetCategories },
    { path: 'dashboard/categories/new', component: CreateNewCategory, canActivate: [authGuard, roleGuard], data: { expectedRoles: ['Administrador'] } },
    { path: 'dashboard/reviews/new', component: NewReviews },
    { path: 'user/profile', component: UserProfile, canActivate: [authGuard] },
    { path: 'dashboard/products', component: GetProductsAdmin, canActivate: [authGuard, roleGuard], data: { expectedRoles: ['Administrador'] } },
    { path: 'dashboard/products/new', component: CreateNewProduct, canActivate: [authGuard, roleGuard], data: { expectedRoles: ['Administrador'] } },
    { path: 'dashboard/users', component: GetUsers, canActivate: [authGuard, roleGuard], data: { expectedRoles: ['Administrador'] } },
    { path: 'products', component: CardsProducts },
//    { path: 'products/productcard', component: ProductCardComponent },
    { path: 'shoppingcart', component: Checkout },
    { path: '**', redirectTo: 'home', pathMatch: 'full' },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
]



