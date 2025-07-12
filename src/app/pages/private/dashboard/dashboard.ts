import { Component } from '@angular/core';
import { ProductService } from '../../../services/product-service';



@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class AdminDashboard {
  products = [
    { id: 1, name: 'Laptop Pro X', price: 1200, description: 'Potente laptop para profesionales.' },
    { id: 2, name: 'Mouse Ergonómico', price: 25, description: 'Diseño cómodo para largas horas de uso.' },
    { id: 3, name: 'Monitor UltraWide', price: 450, description: 'Experiencia visual inmersiva.' },
    { id: 4, name: 'Teclado Mecánico', price: 90, description: 'Respuesta táctil y durabilidad.' }
  ];

  listFavs: any[] = [];
  favIds = new Set<number>();

  constructor( private productService: ProductService) {}



  ngOnInit(): void {
    this.loadFavorites();
    this.productService.getProducts().subscribe({
      next: ( data: any ) => {
        console.log( data.data );

    this.products = data.data
      },
      error: ( error ) => {
        console.error( error );
      },
      complete: () => {}
      
    });
  }

    loadFavorites(): void {
    const stored = localStorage.getItem('@favs');
    this.listFavs = stored ? JSON.parse(stored) : [];
    this.favIds = new Set(this.listFavs.map(p => p.id));
  }

  toggleFavorite(product: any): void {
    const stored = localStorage.getItem('@favs');
    let favs = stored ? JSON.parse(stored) : [];

    const index = favs.findIndex((item: any) => item.id === product.id);

    if (index > -1) {
      favs.splice(index, 1); 
    } else {
      favs.push(product); 
    }

    localStorage.setItem('@favs', JSON.stringify(favs));
    this.loadFavorites(); 
  }

}


