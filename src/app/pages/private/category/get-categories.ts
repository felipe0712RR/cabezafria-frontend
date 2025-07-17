import { Component } from '@angular/core';
import { CategoryService } from '../../../services/category-service';

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
}

