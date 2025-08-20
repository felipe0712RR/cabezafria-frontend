import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth-service';
import Swal from 'sweetalert2';
import { NgxAwesomePopupModule, ConfirmBoxConfigModule } from '@costlydeveloper/ngx-awesome-popup';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {

  @ViewChild('cajita') cajita!:ElementRef;

  isLoggedIn: boolean = false;
  userData!: any 

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
    this.authService.userData$.subscribe((userData)=>{      
      this.userData = userData
    })
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
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Tu sesión actual se cerrará.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, ¡cerrar sesión!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      // Si el usuario confirma, el resultado tendrá `isConfirmed: true`
      if (result.isConfirmed) {
        this.authService.logout();
        this.router.navigateByUrl('home');
      }
    }); 
    
  }
}