import { Component } from '@angular/core';

@Component({
  selector: 'app-get-reviews',
  imports: [],
  templateUrl: './get-reviews.html',
  styleUrl: './get-reviews.css'
})
export class GetReviews {
  reviews: any[] = [];
  productId: string = '';

  ngOnInit() {
    // Suponiendo que el id del producto se obtiene de la ruta o de un servicio
    this.productId = this.getProductId();
    this.loadReviews();
  }

  getProductId(): string {
    // Implementa la lógica para obtener el id del producto (por ejemplo, desde la ruta)
    // Esto es solo un placeholder
    return 'producto-123';
  }

  loadReviews() {
    // Aquí deberías llamar a tu servicio para obtener las reseñas por producto
    // Por ejemplo:
    // this.reviewsService.getReviewsByProductId(this.productId).subscribe(data => this.reviews = data);
    // Por ahora, datos simulados:
    this.reviews = [
      { id: 1, author: 'Juan', comment: 'Excelente producto', rating: 5 },
      { id: 2, author: 'Ana', comment: 'No me gustó tanto', rating: 2 }
    ];
  }
}
