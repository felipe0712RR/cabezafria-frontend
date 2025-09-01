import { Component } from '@angular/core';
import { CategoryService } from '../../../services/category-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get-categories',
  imports: [],
  templateUrl: './get-categories.html',
  styleUrl: './get-categories.css'
})
export class GetCategories {

  categories: any = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    // Detecta cuando el componente se a inicializado
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        console.log(data);
        this.categories = data;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => { }
    });
  }

  onDelete(id: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "La categoria será eliminada.",
      icon: 'warning',
      iconColor: '#0f1724',
      showCancelButton: true,
      confirmButtonColor: '#163e56',
      cancelButtonColor: '#6a7377',
      confirmButtonText: 'Sí, ¡eliminala!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(id)
        this.categoryService.deleteCategories(id).subscribe({
          next: (data) => {
            console.log(data);
            this.ngOnInit()
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => { }
        });
      }
    });
  }
}

