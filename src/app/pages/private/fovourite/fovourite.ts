
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fovourite',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fovourite.html',
  styleUrls: ['./fovourite.css']
})
export class Favourite implements OnInit {
  products = [
    { id: 1, name: 'Laptop Pro X', price: 1200, description: 'Potente laptop para profesionales.' },
    { id: 2, name: 'Mouse Ergonómico', price: 25, description: 'Diseño cómodo para largas horas de uso.' },
    { id: 3, name: 'Monitor UltraWide', price: 450, description: 'Experiencia visual inmersiva.' },
    { id: 4, name: 'Teclado Mecánico', price: 90, description: 'Respuesta táctil y durabilidad.' }
  ];

  listFavs: any[] = [];
  favIds = new Set<number>();

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    const stored = localStorage.getItem('@favs');
    this.listFavs = stored ? JSON.parse(stored) : [];
    this.favIds = new Set(this.listFavs.map(p => p.id));
  }

  toggleFavorite(product: any): void {
    const stored = localStorage.getItem('@favs');
    let favs = stored ? JSON.parse(stored) : [];

    const index = favs.findIndex((item: any) => item.id === product.id);

    if (index > -1) {
      favs.splice(index, 1); 
    } else {
      favs.push(product); 
    }

    localStorage.setItem('@favs', JSON.stringify(favs));
    this.loadFavorites(); 
  }
}

