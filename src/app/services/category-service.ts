import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  BASE_URL: string = environment.apiURL;

  constructor(private http: HttpClient) { }

  registerCategory(newCategory: any) {
    return this.http.post( this.BASE_URL + '/categories', newCategory);
  }

  getCategories() {
    return this.http.get( this.BASE_URL + '/categories')
  }
  deleteCategories(id: string) {
    return this.http.delete( this.BASE_URL + '/categories/'.concat(id))
  }
};
