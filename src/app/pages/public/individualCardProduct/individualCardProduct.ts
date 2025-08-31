import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../services/auth-service';
import { CurrencyPipe, NgClass } from '@angular/common';


@Component({
    selector: 'app-product-card',
    templateUrl: './individualCardProduct.html',
    styleUrls: ['././individualCardProduct.css'],
    imports: [NgClass, CurrencyPipe]
})
export class ProductCardComponent {
    @Input() product: any;

    BASE_URL: string = environment.apiURL;
    user: any;

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {
        this.authService.userData$.subscribe((user) => {
            this.user = user;
        });
    }

    isFavourite(): boolean {
        if (!this.user || !this.user.favourites) return false;
        return this.user.favourites.includes(this.product._id);
    }

    toggleFavourite(): void {
        if (!this.user || !this.user._id) {
            console.warn('Debes iniciar sesión para agregar favoritos');
            return;
        }

        const userId = this.user._id;
        const productId = this.product._id;

        if (this.isFavourite()) {
            // Quitar de favoritos
            this.http.delete(`${this.BASE_URL}/users/${userId}/favorites/${productId}`, {
                headers: this.authService.getHeaders()
            }).subscribe({
                next: (res: any) => {
                    console.log('Producto eliminado de favoritos', res);
                    this.user.favourites = res.favourites;
                    this.authService.updateUser(this.user); // refresca BehaviourSubject + localStorage
                },
                error: (err) => console.error('Error al eliminar de favoritos', err)
            });
        } else {
            // Agregar a favoritos
            this.http.post(`${this.BASE_URL}/users/${userId}/favorites/${productId}`, {}, {
                headers: this.authService.getHeaders()
            }).subscribe({
                next: (res: any) => {
                    console.log('Producto agregado a favoritos', res);
                    this.user.favourites = res.favourites;
                    this.authService.updateUser(this.user); // refresca BehaviourSubject + localStorage
                },
                error: (err) => console.error('Error al agregar a favoritos', err)
            });
        }
    }
}