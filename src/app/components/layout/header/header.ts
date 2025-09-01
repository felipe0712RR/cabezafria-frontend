import { Component, ElementRef, OnInit, ViewChild, ViewChildren, QueryList, AfterViewInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth-service';
import Swal from 'sweetalert2';
import { filter } from 'rxjs';
import { ProductService } from '../../../services/product-service';


@Component({
  selector: 'app-header',
  imports: [RouterLink, ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit, AfterViewInit {

  // Carrusel
  @ViewChild('cajita') cajita!: ElementRef;

  // Push nav
  @ViewChild('topNav', { static: false, read: ElementRef }) topNav?: ElementRef;
  @ViewChildren('openLevel', { read: ElementRef }) openLevels!: QueryList<ElementRef>;
  @ViewChildren('closeLevel', { read: ElementRef }) closeLevels!: QueryList<ElementRef>;
  @ViewChildren('navLevel', { read: ElementRef }) navLevels!: QueryList<ElementRef>;
  @ViewChild('closeLevelTop', { read: ElementRef }) closeLevelTop?: ElementRef;

  isLoggedIn: boolean = false;
  userData!: any;

  brands = [
    { name: 'NEW ERA', logo: 'assets/imgs/newera/neweralogo.png', alt: 'new-era-cap' },
    { name: 'BURBERRY', logo: 'assets/imgs/burberry/burberrylogo.png', alt: 'burberry-cap' },
    { name: 'LOUIS VUITTON', logo: 'assets/imgs/louisvuitton/louisvuittonlogo.png', alt: 'louis-vuitton-cap' },
    { name: 'GOORING BROS', logo: 'assets/imgs/goorinbros/goorinbroslogo.png', alt: 'gooring-bros-cap' },
    { name: 'AMIRI', logo: 'assets/imgs/amiri/amirilogo.png', alt: 'amiri-cap' },
    { name: 'MONASTERY COUTURE', logo: 'assets/imgs/monasterycouture/monasterycouturelogo.png', alt: 'monastery-couture-cap' },
    { name: 'COACH', logo: 'assets/imgs/coach/coachlogo.png', alt: 'coach-cap' },
    { name: 'GUCCI', logo: 'assets/imgs/gucci/guccilogo.png', alt: 'gucci-cap' }
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private renderer: Renderer2,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
    this.authService.userData$.subscribe((userData) => {
      this.userData = userData;
    });
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
      this.closePushNav();
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

    // Menú lateral
    // Abrir niveles
    this.openLevels.forEach((btn) => {
      this.renderer.listen(btn.nativeElement, 'click', () => {
        const nextUl = btn.nativeElement.nextElementSibling;
        if (nextUl) {
          nextUl.classList.add('isOpen');
        }
      });
    });

    // Cerrar niveles
    this.closeLevels.forEach((btn) => {
      this.renderer.listen(btn.nativeElement, 'click', () => {
        const parentUl = btn.nativeElement.closest('.js-pushNavLevel');
        if (parentUl) {
          parentUl.classList.remove('isOpen');
        }
      });
    });

    // Cerrar menú completo
    if (this.closeLevelTop) {
      this.renderer.listen(this.closeLevelTop.nativeElement, 'click', () => {
        this.closePushNav();
      });
    }
  }

  openPushNav() {
    if (this.topNav) {
      this.topNav.nativeElement.classList.add('isOpen');
      document.body.classList.add('pushNavIsOpen');
    }
  }

  closePushNav() {
    if (this.topNav) {
      this.topNav.nativeElement.classList.remove('isOpen');
      this.navLevels.forEach((nav) => nav.nativeElement.classList.remove('isOpen'));
      document.body.classList.remove('pushNavIsOpen');
    }
  }

  onLogout(): void {

    Swal.fire({
      title: '¿Estás seguro?',
      text: "Tu sesión actual se cerrará.",
      icon: 'warning',
      iconColor: '#0f1724',
      showCancelButton: true,
      confirmButtonColor: '#163e56',
      cancelButtonColor: '#6a7377',
      confirmButtonText: 'Sí, ¡cerrar sesión!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
        this.closePushNav();
        this.router.navigateByUrl('home');
      }
    }); 
    
  }

  filtrarPorMarca(productBrand: string){    
    this.productService.setProductFilter(productBrand);
    this.closePushNav()
    this.router.navigateByUrl('products')
  }
}