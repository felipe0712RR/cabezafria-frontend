import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
BASE_URL : string= environment.apiUrl;
  constructor(private http:HttpClient) { }

  registerUsers( newUsers: any ) {
    return this.http.post(`${this.BASE_URL}/users`, newUsers)
  }

  getUsers() {
    return this.http.get( `${this.BASE_URL}/users` );
  }

  deleteUsers(id: string) {
    return this.http.delete(`${this.BASE_URL}/users/`.concat( id ))
  }

  // hideAdmins() {
  //   return this.http.get(`${this.BASE_URL}/users` )
  // }

  // getRole() {
  //   const role = this.getUsers.('admin') ?? '';
  //   console.log(token);
  //   return new HttpHeaders().set('X-Token', token);
  // }
};
