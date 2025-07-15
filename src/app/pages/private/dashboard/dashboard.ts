import { Component } from '@angular/core';
import { ProductService } from '../../../services/product-service';
import { CartService } from '../../../services/cart-service';
import { DataProduct } from '../../../models/product-item.model';





@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class AdminDashboard {
  products: DataProduct[] | undefined

  constructor (
    private productService: ProductService,
    private cartService: CartService
  ) {}

    ngOnInit() {
      this.productService.getProducts().subscribe({
        next: ( data: any) => {
          console.log( data.data );

          this.products = data.data
        },
        error: ( error ) => {
          console.error( error );
        },
        complete: () => {}
      });
    }

    addToCard( product: CartService ){
      this.cartService.addToCart( product );
    }
}


