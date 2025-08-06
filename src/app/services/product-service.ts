import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  BASE_URL : string= environment.apiUrl;

  constructor(private http: HttpClient) { }

  registerProduct(newProduct: any) {
    return this.http.post(`${this.BASE_URL}/products`, newProduct);
  }

  getProducts() {
    return this.http.get<any>(`${this.BASE_URL}/products`)
  }

  getProductsId(id: string) {
    return this.http.get(`${this.BASE_URL}/products/`.concat(id))
  }

  deleteProducts(id: string) {
    return this.http.delete(`${this.BASE_URL}/products/`.concat(id))
  }
};
