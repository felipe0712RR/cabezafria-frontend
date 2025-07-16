import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) { }

  addComment(newComment: any) {
    return this.http.post('http://localhost:3000/home', newComment);
  }
  getComments() {
    return this.http.get('http://localhost:3000//home');
  }

};
