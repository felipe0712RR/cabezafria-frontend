import { Component, } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth-service';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterLink, NgStyle],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  constructor(private authservice: AuthService) { }

  images: string[] = [
    'assets/imgs/img-main-carrusel/img1.jpg',
    'assets/imgs/img-main-carrusel/img2.jpg',
    'assets/imgs/img-main-carrusel/img3.jpg',
    'assets/imgs/img-main-carrusel/img4.jpg',
    'assets/imgs/img-main-carrusel/img5.jpg',
    'assets/imgs/img-main-carrusel/img6.jpg'
  ];

  currentIndex = 0;

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  buttonDasboard(): boolean {
    return this.authservice.user?.userRole === 'Administrador';
  }
}



