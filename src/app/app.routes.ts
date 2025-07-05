import { Routes } from '@angular/router';
import { Home } from './pages/public/home/home';
import { Login } from './pages/public/login/login';
import { Register } from './pages/public/register/register';
import { Favourite } from './pages/private/users/new-form/fovourite/fovourite';


export const routes: Routes = [ 
    { path: 'home', component: Home },
    { path: 'login', component: Login},
    { path:'register', component: Register},
    { path: 'favourite', component: Favourite},
    { path: '**', redirectTo: 'home',pathMatch: 'full'},
    { path: '', redirectTo: 'home',pathMatch: 'full'}
];
