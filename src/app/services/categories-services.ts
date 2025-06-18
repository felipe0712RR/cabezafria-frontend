import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesServices {

  constructor(private http:HttpClient) { }

  async getProducts (){
    this.http.get('http://localhost:3000/api/products')
  }
};
