import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product-service';
import { CartService } from '../../../services/cartsopphing-service';
import { dataProduct } from '../../../models/product.model';
import { AuthService } from '../../../services/auth-service';
import { UserService } from '../../../services/users-service';
import { User } from '../../../models/user.model';
import Swal from 'sweetalert2';

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

  removeFromFavorites(productId: string) {
    const userId = this.user?._id;  // puede ser string | undefined
    if (!userId) return;            // cortamos si no hay userId

    Swal.fire({
      title: '¿Estás seguro?',
      text: "Tu elemento se irá de favoritos.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, ¡Eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.removeFavourite(userId, productId).subscribe({
          next: () => {
            // actualizamos el array local sin recargar la página
            this.favorites = this.favorites.filter(p => p._id !== productId);
            console.log("Producto removido de favoritos:", productId);
          },
          error: (err) => console.error("Error removiendo favorito", err)
        });
      }
    })
  }
}

