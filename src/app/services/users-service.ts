import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { dataProduct } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  BASE_URL: string = environment.apiURL;

  constructor(private http: HttpClient) { }

  registerUsers(newUsers: any) {
    return this.http.post(this.BASE_URL + '/users', newUsers)
  }

  getUsers() {
    return this.http.get(this.BASE_URL + '/users');
  }

  deleteUsers(id: string) {
    return this.http.delete(this.BASE_URL + '/users/'.concat(id))
  }

  addFavourite(userId: string, productId: string) {
    return this.http.post(this.BASE_URL + '/users/' + userId + '/favorites/' + productId, {});
  }

  removeFavourite(userId: string, productId: string) {
    return this.http.delete(this.BASE_URL + '/users/' + userId + '/favorites/' + productId);
  }

  getFavourites(userId: string) {
  return this.http.get<dataProduct[]>(this.BASE_URL + '/users/' + userId + '/favorites');
}
};
