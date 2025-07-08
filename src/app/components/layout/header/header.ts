import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth-services';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  constructor( private authService: AuthService, private router: Router){
  }

  logOut(){
    console.log('nos salimos del sistema');
    this.authService.deleteLocalStorage('token');
    this.router.navigateByUrl('home');
  }
}
