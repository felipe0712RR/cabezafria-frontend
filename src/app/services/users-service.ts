import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  registerUsers( newUsers: any ) {
    return this.http.post('http://localhost:3000/api/users', newUsers)
  }

  getUsers() {
    return this.http.get( 'http://localhost:3000/api/users' );
  }

  deleteUsers(id: string) {
    return this.http.delete('http://localhost:3000/api/users/'.concat( id ))
  }

  // hideAdmins() {
  //   return this.http.get('http://localhost:3000/api/users' )
  // }

  // getRole() {
  //   const role = this.getUsers.('admin') ?? '';
  //   console.log(token);
  //   return new HttpHeaders().set('X-Token', token);
  // }
};
