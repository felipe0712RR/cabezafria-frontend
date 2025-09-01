import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product-service';
import { AuthService } from '../../../services/auth-service';
<<<<<<< HEAD
import { CurrencyPipe, NgClass } from '@angular/common';
import { ProductService } from '../../../services/product-service';
import { CartService } from '../../../services/cartsopphing-service';
import { dataProduct } from '../../../models/product.model';
import { ActivatedRoute } from '@angular/router';

=======
import { dataProduct, Review } from '../../../models/product.model';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/users-service';
>>>>>>> 48455f4d514f7051df52a2fadefa80dcb33b11c9

@Component({
    selector: 'app-product-card',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './individualCardProduct.html',
<<<<<<< HEAD
    styleUrls: ['././individualCardProduct.css'],
    imports: [NgClass, CurrencyPipe],
})
export class ProductCardComponent {
    @Input() product: any;
    products: dataProduct[] | undefined;
=======
    styleUrls: ['./individualCardProduct.css']
})
export class ProductCard implements OnInit {
    product!: dataProduct;
    user: User | null = null;
    isFavorite: boolean = false;
>>>>>>> 48455f4d514f7051df52a2fadefa80dcb33b11c9

    // Formulario reseña
    newReview: { comment: string; rating: number } = { comment: '', rating: 0 };

    constructor(
<<<<<<< HEAD
        private http: HttpClient,
        private authService: AuthService,
        private productService: ProductService,
        private cartService: CartService
    ) {
        this.authService.userData$.subscribe((user) => {
=======
        private route: ActivatedRoute,
        private productService: ProductService,
        private authService: AuthService,
        private userService: UserService
    ) { }

    ngOnInit(): void {
        const productId = this.route.snapshot.paramMap.get('id');
        if (productId) {
            this.loadProduct(productId);
        }

        this.authService.userData$.subscribe(user => {
>>>>>>> 48455f4d514f7051df52a2fadefa80dcb33b11c9
            this.user = user;
            // Si el producto ya cargó, actualiza favoritos
            if (this.product && user?.userFavorites?.includes(this.product._id!)) {
                this.isFavorite = true;
            }
        });
    }
    // ngOnInit(): void {
    //     // const id = this.route.snapshot.paramMap.get('id');
    //     if (id) {
    //         this.productService.getProductsId(id).subscribe({
    //             next: (data) => (this.product = data),
    //             error: (err) => console.error('Error al cargar producto', err),
    //         });
    //     }
    // }

    loadProduct(productId: string) {
        this.productService.getProductsId(productId).subscribe({
            next: (product: dataProduct) => {
                this.product = product;

                if (this.user?.userFavorites?.includes(this.product._id!)) {
                    this.isFavorite = true;
                }
            },
            error: (err) => console.error('Error cargando producto', err)
        });
    }

    toggleFavorite() {
        if (!this.user?._id || !this.product?._id) return;

<<<<<<< HEAD
        const userId = this.user._id;
        const productId = this.product._id;

        if (this.isFavourite()) {
            // Quitar de favoritos
            this.http
                .delete(`${this.BASE_URL}/users/${userId}/favorites/${productId}`, {
                    headers: this.authService.getHeaders(),
                })
                .subscribe({
                    next: (res: any) => {
                        console.log('Producto eliminado de favoritos', res);
                        this.user.favourites = res.favourites;
                        this.authService.updateUser(this.user); // refresca BehaviourSubject + localStorage
                    },
                    error: (err) => console.error('Error al eliminar de favoritos', err),
                });
        } else {
            // Agregar a favoritos
            this.http
                .post(
                    `${this.BASE_URL}/users/${userId}/favorites/${productId}`,
                    {},
                    {
                        headers: this.authService.getHeaders(),
                    }
                )
                .subscribe({
                    next: (res: any) => {
                        console.log('Producto agregado a favoritos', res);
                        this.user.favourites = res.favourites;
                        this.authService.updateUser(this.user); // refresca BehaviourSubject + localStorage
                    },
                    error: (err) => console.error('Error al agregar a favoritos', err),
                });
        }
    }
=======
        if (this.isFavorite) {
            this.userService.removeFavourite(this.user._id, this.product._id!).subscribe({
                next: () => this.isFavorite = false,
                error: (err) => console.error('Error removiendo favorito', err)
            });
        } else {
            this.userService.addFavourite(this.user._id, this.product._id!).subscribe({
                next: () => this.isFavorite = true,
                error: (err) => console.error('Error agregando favorito', err)
            })
        }
    }

    submitReview() {
        if (!this.user || !this.product?._id) return;

        const review: Review = {
            reviewUserId: this.user._id,
            reviewProductId: this.product._id,  
            reviewQualification: this.newReview.rating, 
            reviewContent: this.newReview.comment       
        };

        this.productService.addReview(this.product._id, review).subscribe({
            next: (createdReview: Review) => {
                // Agregar la reseña recién creada al array local
                this.product!.productReviews = [
                    ...(this.product!.productReviews || []),
                    createdReview
                ];

                // Resetear el formulario
                this.newReview = { comment: '', rating: 0 };
            },
            error: (err) => console.error('Error agregando reseña', err)
        });
    }
>>>>>>> 48455f4d514f7051df52a2fadefa80dcb33b11c9
}
