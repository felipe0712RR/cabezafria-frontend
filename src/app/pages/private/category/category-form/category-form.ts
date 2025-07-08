import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../../services/category-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-category-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './category-form.html',
  styleUrl: './category-form.css'
})
export class CategoryForm {
  formData!: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.formData = new FormGroup({
      categoryName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      categoryDescription: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
      categoryState: new FormControl(true),
    });
  }

  onSubmit() {
    if (this.formData.valid) {
      this.categoryService.registerCategory(this.formData.value).subscribe({
        next: (data) => {
          console.log(data);
          this.router.navigateByUrl('/dashboard/categories/new');
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => { }
      });
      this.formData.reset();
    }
  }
}