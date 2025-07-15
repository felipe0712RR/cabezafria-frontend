import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor( private http:HttpClient) {  }

  createReview(newReview: object){
    return this.http.post('http://localhost:3000/api/reviews', newReview)
  }

}
