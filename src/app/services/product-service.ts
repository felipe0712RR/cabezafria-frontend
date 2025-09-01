import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { dataProduct } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _brandFilter = new BehaviorSubject<string>('');

  public brandFilter$: Observable<string> = this._brandFilter.asObservable();

  BASE_URL: string = environment.apiURL;

  constructor(private http: HttpClient) { }

  registerProduct(newProduct: any) {
    return this.http.post(this.BASE_URL + '/products', newProduct);
  }

  getProducts() {
    return this.http.get<any>(this.BASE_URL + '/products')
  }

  getProductsId(id: string) {
    return this.http.get(this.BASE_URL + '/products/'.concat(id))
  }

  deleteProducts(id: string) {
    return this.http.delete(this.BASE_URL + '/products/'.concat(id))
  }

  filterProductsByBrand(filter: string) {    
    return this.http.post<any>(this.BASE_URL + '/products/brand', {
      productBrand: filter
    })
  }

  setProductFilter(value: string) {
    this._brandFilter.next(value);
  }

  getCurrentProductFilter(): string {
    return this._brandFilter.getValue();
  }

};
