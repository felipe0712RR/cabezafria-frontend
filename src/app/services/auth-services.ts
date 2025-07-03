import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValueChangeEvent } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthServices {

  constructor( private http: HttpClient ) {}

  loginUser ( credentials: any ) {
    return this.http.post( 'http://localhost:3000/api/auth/login', credentials );

  }
    saveLocalStorage(  key: string, value: any ) {
      localStorage.setItem ( key, value );
    }

    deleteLocalStorage( key: string ) {
      localStorage.removeItem( key );
    }
    
    verifyAuthenticateUser () {
      return this.http.get( 'http://localhost:3000/api/auth/re-new-token', { headers: this.getHeaders() } );
    }


    getHeaders() {
      const token = localStorage.getItem( 'token' ) ??'';
      return new HttpHeaders().set( 'x-token', token );
    }

}
