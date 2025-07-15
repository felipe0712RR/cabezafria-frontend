import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  private _userData = new BehaviorSubject<object>({});
  public isLoggedIn$: Observable<boolean> = this._isLoggedIn.asObservable(); 
  public userData$: Observable<object> = this._userData.asObservable(); 
  user!: any

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    this.user = JSON.parse(localStorage.getItem('user') as string);
    if (token) {
      this._isLoggedIn.next(true);
      this._userData.next(this.user)
    }
  }

  login(): void {
    this._isLoggedIn.next(true);
    this._userData.next(this.user)
  }

  logout(): void {
    console.log('nos salimos del sistema');
    this._isLoggedIn.next(false);
  }

  loginUser(credentials: any) {
    return this.http.post('http://localhost:3000/api/auth/login', credentials);
  }
  
  saveLocalStorage(key: string, value: any) {
    localStorage.setItem(key, value);
  }

  deleteLocalStorage(key: string) {
    localStorage.removeItem(key);
  }

  verifyAuthenticateUser() {
    return this.http
      .get('http://localhost:3000/api/auth/re-new-token', {
        headers: this.getHeaders(),
      })

      .pipe(
        map((data: any) => {
          console.log(data);

          return data.token;
        }),
        catchError(() => {
          return of(false);
        })
      );

    //   .pipe(
    //     tap( ( data ) => {
    //       console.log( data );

    //       return data;
    //   } ),
    //   map( ( newdata: any ) => {
    //     return newdata.token.length;
    //   } ),
    //   catchError( () => {
    //     return of( false );
    //   } ),
    // );
  }

  // hasRole( expectedRoles: string ) : boolean  {
  //   const userRole = 

  //   return expectedRoles.includes( userRole );
  // }


  getHeaders() {
    const token = localStorage.getItem('token') ?? '';
    console.log(token);
    return new HttpHeaders().set('X-Token', token);
  }
}
