import { Component } from '@angular/core';
import { ProductService } from '../../../services/product-service'
import { dataProduct } from '../../../models/product.model';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../../services/cartsopphing-service';
@Component({
  selector: 'app-cartshopping',
  imports: [CurrencyPipe],
  templateUrl: './cartshopping.html',
  styleUrl: './cartshopping.css'
})
export class Cartshopping {

  products: dataProduct[] | undefined;
  constructor(
    private productsService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit() {
    /** Obtener todos los productos del backend */
    this.productsService.getProducts().subscribe({
      next: (data) => {
        console.log(data);

        this.products = data;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => { }
    });
  }

  addToCard(product: dataProduct) {
    this.cartService.updateToCart(product, +1);
  }
}



