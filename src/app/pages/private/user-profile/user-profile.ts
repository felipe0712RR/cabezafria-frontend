import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product-service';
import { CartService } from '../../../services/cartsopphing-service';
import { dataProduct } from '../../../models/product.model';
import { AuthService } from '../../../services/auth-service';
import { UserService } from '../../../services/users-service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.html',
  styleUrls: ['./user-profile.css']
})
export class UserProfile implements OnInit {
  user!: User | null;
  isLoggedIn: boolean = false;
  favorites: dataProduct[] = [];


  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });

    this.authService.userData$.subscribe((userData: any) => {
      this.user = userData;
      if (this.user?._id) {
        this.loadFavorites(this.user._id);
      }
    });
  }

  addToCart(product: dataProduct) {
    this.cartService.updateToCart(product, +1);
  }

  loadFavorites(userId: string) {
    this.userService.getFavourites(userId).subscribe({
      next: (favorites) => {
        this.favorites = favorites;
        console.log('Favoritos:', favorites);
      },
      error: (err) => console.error('Error cargando favoritos', err)
    });
  };


  // toggleFavorite(product: any): void {
  //   const stored = localStorage.getItem('@favs');
  //   let favs = stored ? JSON.parse(stored) : [];
  //   const exists = favs.some((item: any) => item._id === product._id);
  //   if (exists) {
  //     favs = favs.filter((item: any) => item._id !== product._id);
  //   } else {
  //     favs.push(product);
  //   }
  //   localStorage.setItem('@favs', JSON.stringify(favs));
  //   this.loadFavorites();
  // }
}

