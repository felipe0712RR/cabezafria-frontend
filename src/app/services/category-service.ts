import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  registerCategory(newCategory: any) {
    return this.http.post('http://localhost:3000/api/categories', newCategory);
  }

  getCategories() {
    return this.http.get('http://localhost:3000/api/categories')
  }
  deleteCategories(id: string) {
    return this.http.delete('http://localhost:3000/api/categories/'.concat(id))
  }
};
