import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  BASE_URL : string= environment.apiUrl;

  constructor( private http:HttpClient) {  }

  createReview(newReview: object){
    return this.http.post(`${this.BASE_URL}/reviews`, newReview)
  }

}
