
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product-service';
import { CardsProducts } from '../../public/cardsProducts/cardsProducts';
import { CartService } from '../../../services/cartsopphing-service';
import { dataProduct } from '../../../models/product.model';

@Component({
  selector: 'app-fovourite',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favourite.html',
  styleUrls: ['./favourite.css']
})
export class Favourite implements OnInit {
  products: any[] = []
    

  listFavs: any[] = [];
  favIds = new Set<number>();

  constructor(
     private productService: ProductService,
     private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadFavorites(); 
    
    this.productService.getProducts().subscribe({
      next: ( data: any[] ) => {
        console.log(data) 
        const seen = new Set();
        this.products = data.filter((product) => {
          if(!product._id) return false;
          if( seen.has(product._id)) return false;
          seen.add(product._id);
          return true;
        });
      },
      error: ( error) => {
        console.error( error );
      },
      complete: () => {}
    });
  }
  addToCart(product: dataProduct) {
    this.cartService.updateToCart(product, +1);
  }

  loadFavorites(): void {
    const stored = localStorage.getItem('@favs');
    this.listFavs = stored ? JSON.parse(stored) : [];
    this.favIds = new Set(this.listFavs.map(p => p._id));
  }

  toggleFavorite(product: any): void {
    const stored = localStorage.getItem('@favs');
    let favs = stored ? JSON.parse(stored) : [];

  const exists = favs.some((item: any) => item._id === product._id);


  if (exists) {
  favs = favs.filter((item: any) => item._id !== product._id);
} else {
  favs.push(product);
}

    localStorage.setItem('@favs', JSON.stringify(favs));
    this.loadFavorites(); 
  }
}

