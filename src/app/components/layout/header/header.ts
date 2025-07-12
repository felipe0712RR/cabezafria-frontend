import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {

  @ViewChild('cajita') cajita!:ElementRef;

  isLoggedIn: boolean = false;

  brands = [
    {
      name: 'NEW ERA',
      logo: 'assets/imgs/newera/neweralogo.png',
      alt: 'new-era-cap',
    },
    {
      name: 'BURBERRY',
      logo: 'assets/imgs/burberry/burberrylogo.png',
      alt: 'burberry-cap',
    },
    {
      name: 'LOUIS VUITTON',
      logo: 'assets/imgs/louisvuitton/louisvuittonlogo.png',
      alt: 'louis-vuitton-cap',
    },
    {
      name: 'GOORING BROS',
      logo: 'assets/imgs/goorinbros/goorinbroslogo.png',
      alt: 'gooring-bros-cap',
    },
    {
      name: 'AMIRI',
      logo: 'assets/imgs/amiri/amirilogo.png',
      alt: 'amiri-cap',
    },
    {
      name: 'MONASTERY COUTURE',
      logo: 'assets/imgs/monasterycouture/monasterycouturelogo.png',
      alt: 'monastery-couture-cap',
    },
    {
      name: 'COACH',
      logo: 'assets/imgs/coach/coachlogo.png',
      alt: 'coach-cap',
    },
    {
      name: 'GUCCI',
      logo: 'assets/imgs/gucci/guccilogo.png',
      alt: 'gucci-cap',
    },
  ];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }

  ngAfterViewInit(): void {
    let velocidadDesplazamiento = 5;
    let desplazamiento = 0;
    setInterval(() => {
      desplazamiento += velocidadDesplazamiento;
      if (this.cajita) {
        this.cajita.nativeElement.scrollLeft = desplazamiento;
        if (
          desplazamiento >=
          this.cajita.nativeElement.scrollWidth - this.cajita.nativeElement.clientWidth
        ) {
          desplazamiento = 0;
        }
      }
    }, 50);
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login'); // Redirige a la página de login después de cerrar sesión
    console.log('nos salimos del sistema');
    this.authService.deleteLocalStorage('token');
    this.router.navigateByUrl('home');
    Swal.fire({
      title: "Cerraste Sesión..!",
      icon: "success",
      draggable: true
    });
  }
}