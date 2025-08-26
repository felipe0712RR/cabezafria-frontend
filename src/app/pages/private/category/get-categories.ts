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

<<<<<<< HEAD
    Swal.fire({
=======
Swal.fire({
>>>>>>> 50739836b519a2e6975b23d96c45c02e34216c3d
      title: '¿Estás seguro?',
      text: "La categoria será eliminada.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, ¡eliminala!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
<<<<<<< HEAD
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


=======
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

    
>>>>>>> 50739836b519a2e6975b23d96c45c02e34216c3d
  }
}

