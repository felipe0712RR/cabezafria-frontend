import { Component } from '@angular/core';
import { ProductService } from '../../../services/product-service'
import { dataProduct } from '../../../models/product.model';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../../services/cartsopphing-service';
import { switchMap } from 'rxjs';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-cartshopping',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cardsProducts.html',
  styleUrl: './cardsProducts.css'
})
export class CardsProducts {
  products: dataProduct[] | undefined;

  constructor(
    private productsService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.productsService.brandFilter$
      .pipe(
        switchMap((brand) => {
          if (brand) {
            return this.productsService.filterProductsByBrand(brand)
          } else {
            return this.productsService.getProducts()
          }
        }
        )
      )
      .subscribe((res) => {
        this.products = res;
      });
  }

  addToCart(product: dataProduct) {
    this.cartService.updateToCart(product, +1);
  }
}



