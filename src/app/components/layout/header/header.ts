import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {

  isLoggedIn: boolean = false;

  constructor( private authService: AuthService, private router: Router){
  }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login'); // Redirige a la página de login después de cerrar sesión
  }

  logOut(){
    console.log('nos salimos del sistema');
    this.authService.deleteLocalStorage('token');
    this.router.navigateByUrl('home');
  }
}