import { Component } from '@angular/core';
import { ProductService } from '../../../services/product-service';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-get-products-admin',
  imports: [CurrencyPipe],
  templateUrl: './get-products-admin.html',
  styleUrl: './get-products-admin.css'
})
export class GetProductsAdmin {
  products: any = [];

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    // Detecta cuando el componente se a inicializado
    this.productService.getProducts().subscribe({
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

  onDelete(id: string) {
    console.log(id)
    this.productService.deleteProducts(id).subscribe({
      next: (data) => {
        console.log(data);
        this.ngOnInit()
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => { }
    });
  }

  
}

