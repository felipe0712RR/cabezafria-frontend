import { Component } from '@angular/core';
import { ProductService } from '../../../services/product-service';
import { CurrencyPipe } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-get-products-admin',
  imports: [CurrencyPipe],
  templateUrl: './get-products-admin.html',
  styleUrl: './get-products-admin.css'
})
export class GetProductsAdmin {
  products: any = [];
  filterProducts: any[] = [];

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

    Swal.fire({
      title: '¿Estás seguro?',
      text: "El producto será eliminado.",
      icon: 'warning',
      iconColor: '#0f1724',
      showCancelButton: true,
      confirmButtonColor: '#163e56',
      cancelButtonColor: '#6a7377',
      confirmButtonText: 'Sí, ¡eliminalo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
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
    });


  }

  // buscarProductos(filtro: string) {
  //   this.productService.filterProducts().subscribe({
  //     next: (res: any[]) => {
  //       this.filterProducts = res; 
  //       console.log("Resultado filtrado:", res);
  //     },
  //     error: (err) => {
  //       console.error("Error al filtrar:", err);
  //     }
  //   });
  // }

}

