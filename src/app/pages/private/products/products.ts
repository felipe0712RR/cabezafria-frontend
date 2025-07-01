import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ProductService } from '../../../services/product-service';
@Component({
  selector: 'app-products',
  imports: [ CurrencyPipe ],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products {
  products: any = [];

  constructor( private productService: ProductService ) {}

  ngOnInit() {
    // Detecta cuando el componente se a inicializado
    this.productService.getProducts().subscribe({
      next: ( data ) => {
        console.log( data );
        this.products = data;
      },
      error: ( error ) => {
        console.error( error );
      },
      complete: () => {}
    });
  }

  loadData() {
    // Detecta cuando el componente se a inicializado
    this.productService.getProducts().subscribe({
      next: ( data ) => {
        console.log( data );
        this.products = data;
      },
      error: ( error ) => {
        console.error( error );
      },
      complete: () => {}
    });
  }

  onDelete(id: string){
    console.log(id)
    this.productService.deleteProducts(id).subscribe({
      next: ( data ) => {
        console.log( data );
        this.loadData()
      },
      error: ( error ) => {
        console.error( error );
      },
      complete: () => {}
    });
  }
}