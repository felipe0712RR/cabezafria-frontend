import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  BASE_URL: string = environment.apiURL;

  constructor(private http: HttpClient) { }

  addComment(newComment: any) {
    return this.http.post( this.BASE_URL + '/home', newComment);
  }
  getComments() {
    return this.http.get( this.BASE_URL + '//home');
  }

};
