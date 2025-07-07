import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient ) { }

  loginUser(credentials: any){ //credentials: {userEmail: 'celydaniel97@gmail.com', userPassword: '123456789'}
    return this.http.post('http://localhost:3000/api/auth/login', credentials)
  }

  saveLocalStorage(key: string, value: any){
    localStorage.setItem(key, value)
  }

  deleteLocalStorage(key: string){
    localStorage.removeItem(key)
  }

  //verifica el ususario autenticado
  verifyAuthenticateUser(){
    return this.http.get('http://localhost:3000/api/auth/re-new-token', {headers: this.getHeaders()}).pipe(
      map((data: any)=>{
        console.log('service', data);
        
        return data.token;
      }),
      catchError(()=>{
        return of(false)
      })
    )    
  }

  //Obtiene el token del localStorage, Envuelve el token en una header tipo Http
  getHeaders(){
    const token = localStorage.getItem('token') ?? '';
    
    return new HttpHeaders().set('X-Token', token)
  }

}

//Ejemplo de como funciona RXJS

    // return this.http.get('http://localhost:3000/api/auth/re-new-token', {headers: this.getHeaders()})
    // .pipe(
    //   tap((data) => {
    //     console.log(data);
    //     return data

    //   }),
    //   map((newData: any)=>{
    //     return newData.token.length;

    //   }),
    //   catchError(()=>{
    //     return of(false)

    //   })
    // );