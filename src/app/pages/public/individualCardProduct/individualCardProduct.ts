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
    isFavorite: boolean = false;
    private userSub?: Subscription;

    // Formulario reseña
    newReview: { comment: string; rating: number } = { comment: '', rating: 0 };

    constructor(
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

        this.userSub = this.authService.userData$.subscribe(user => {
            this.user = user;
            this.updateIsFavorite();
        });
    }

    ngOnDestroy(): void {
        this.userSub?.unsubscribe();
    }

    loadProduct(productId: string) {
        this.productService.getProductsId(productId).subscribe({
            next: (product: dataProduct) => {
                this.product = product;
                this.updateIsFavorite();
            },
            error: (err) => console.error('Error cargando producto', err)
        });
    }

    updateIsFavorite() {
        this.isFavorite = !!(
            this.user?.userFavorites &&
            this.product?._id &&
            this.user.userFavorites
                .map((fav: dataProduct) => fav._id)
                .includes(this.product._id)
        );
    }

    toggleFavorite() {
        if (!this.user?._id || !this.product?._id) return;

        if (this.isFavorite) {
            this.userService.removeFavourite(this.user._id, this.product._id).subscribe({
                next: () => this.isFavorite = false,
                error: (err) => console.error('Error removiendo favorito', err)
            });
        } else {
            this.userService.addFavourite(this.user._id, this.product._id).subscribe({
                next: () => this.isFavorite = true,
                error: (err) => console.error('Error agregando favorito', err)
            });
        }
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
    }
