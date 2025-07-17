import { Component } from '@angular/core';
import { CartService } from '../../../services/cartsopphing-service';
import { CartItem } from '../../../models/cart-items.model';
import { CurrencyPipe } from '@angular/common';
import { dataProduct } from '../../../models/product.model';

@Component({
  selector: 'app-checkout',
  imports: [CurrencyPipe],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout {
  cartItems: CartItem[] | undefined;

  constructor(private CartService: CartService) { }

  ngOnInit() {
    this.cartItems = this.CartService.getCartItems();
  }

  onTotal() {
    return this.CartService.calculateCartTotal();
  }

  onIncrease(product: dataProduct) {
    console.log('Incrementa en 1 el producto seleccionado');
    this.CartService.updateToCart(product, +1);
    this.ngOnInit();
  }

  onDecrease(product: dataProduct) {
    console.log('Decrementa en 1 el producto seleccionado');
    this.CartService.updateToCart(product, -1);
    this.ngOnInit();
  }

  onRemove(product: dataProduct) {
    console.log('Establece el valor en 0 del producto seleccionado');
    this.CartService.updateToCart(product, 0);
    this.ngOnInit();
  }

}


