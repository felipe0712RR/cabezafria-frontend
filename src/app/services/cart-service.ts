import { Injectable } from '@angular/core';
import { DataProduct } from '../models/product-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItem: any[] = []

  constructor() { }

  addToCart( product: any ) {
    this.cartItem.push( product );

    localStorage.setItem( 'shoppingcart',JSON.stringify(this.cartItem ));

  }
}
