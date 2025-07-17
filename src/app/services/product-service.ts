import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  registerProduct(newProduct: any) {
    return this.http.post('http://localhost:3000/api/products', newProduct);
  }

  getProducts() {
    return this.http.get<any>('http://localhost:3000/api/products')
  }

  getProductsId(id: string) {
    return this.http.get('http://localhost:3000/api/products/'.concat(id))
  }

  deleteProducts(id: string) {
    return this.http.delete('http://localhost:3000/api/products/'.concat(id))
  }
};
