import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product-service';
import { AuthService } from '../../../services/auth-service';
import { dataProduct, Review } from '../../../models/product.model';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/users-service';
import { Subscription } from 'rxjs';
import { CartService } from '../../../services/cartsopphing-service';

@Component({
    selector: 'app-product-card',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './individualCardProduct.html',
    styleUrls: ['./individualCardProduct.css']
})
export class ProductCard implements OnInit, OnDestroy {
    product?: dataProduct;
    user: User | null = null;
    favorites: dataProduct[] = [];
    private userSub?: Subscription;

    // Formulario reseña
    newReview: { comment: string; rating: number } = { comment: '', rating: 0 };

    constructor(
        private route: ActivatedRoute,
        private productService: ProductService,
        private authService: AuthService,
        private userService: UserService,
        private cartService: CartService
    ) { }

    ngOnInit(): void {
        const productId = this.route.snapshot.paramMap.get('id');
        if (productId) {
            this.loadProduct(productId);
        }

        this.userSub = this.authService.userData$.subscribe(user => {
            this.user = user;
            this.updateFavorites();
        });
    }

    ngOnDestroy(): void {
        this.userSub?.unsubscribe();
    }

    loadProduct(productId: string) {
        this.productService.getProductsId(productId).subscribe({
            next: (product: dataProduct) => {
                this.product = product;
                this.updateFavorites();
            },
            error: (err) => console.error('Error cargando producto', err)
        });
    }

    // Actualizamos el array de favoritos local
    updateFavorites() {
        if (this.user?.userFavorites && this.product?._id) {
            this.favorites = this.user.userFavorites.filter(
                (fav: dataProduct) => fav._id !== undefined
            );
        }
    }

    isFavorite(): boolean {
        return !!(this.favorites.some(p => p._id === this.product?._id));
    }

    toggleFavorite() {
        const userId = this.user?._id;
        const productId = this.product?._id;

        if (!userId || !productId || !this.product) return;

        if (this.isFavorite()) {
            // Quitar favorito
            this.userService.removeFavourite(userId, productId).subscribe({
                next: () => {
                    this.favorites = this.favorites.filter(p => p._id !== productId);
                    console.log("Producto removido de favoritos:", productId);
                },
                error: (err) => console.error("Error removiendo favorito", err)
            });
        } else {
            // Agregar favorito
            this.userService.addFavourite(userId, productId).subscribe({
                next: () => {
                    this.favorites.push(this.product!);
                    console.log("Producto agregado a favoritos:", productId);
                },
                error: (err) => console.error("Error agregando favorito", err)
            });
        }
    }

    addToCart(product: dataProduct) {
        this.cartService.updateToCart(product, +1);
    }

    // submitReview() {
    //     if (!this.user || !this.product?._id) return;

    //     const review: Review = {
    //         reviewUserId: this.user._id,
    //         reviewProductId: this.product._id,  
    //         reviewQualification: this.newReview.rating, 
    //         reviewContent: this.newReview.comment       
    //     };

    //     this.productService.addReview(this.product._id, review).subscribe({
    //         next: (createdReview: Review) => {
    //             this.product!.productReviews = [
    //                 ...(this.product!.productReviews || []),
    //                 createdReview
    //             ];
    //             this.newReview = { comment: '', rating: 0 };
    //         },
    //         error: (err) => console.error('Error agregando reseña', err)
    //     });
    // }
}
