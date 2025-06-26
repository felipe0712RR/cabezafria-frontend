import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../../services/category-service';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product';

@Component({
  selector: 'app-new-from',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-form.html',
  styleUrl: './new-form.css'
})
export class ProductNewFrom {
  formData!: FormGroup;
  categories: any = []

  constructor(
    private categoryService: CategoryService,
    private product: ProductService
  ) {
    this.formData = new FormGroup({
      productName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
      productDescription: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]),
      productPrice: new FormControl(0, [Validators.required, Validators.min(1)]),
      productSize: new FormControl('', [Validators.required]),
      productColor: new FormControl('', [Validators.required]),
      productStock: new FormControl(1, [Validators.required, Validators.min(1)]),
      productUrlImage: new FormControl('', [Validators.required]),
      productCategory: new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(30)]),
      productState: new FormControl(true, [Validators.required])
    });
  };

  onSubmit() {

    if (this.formData.valid) {
      console.log(this.formData.value);
      this.product.registerProduct(this.formData.value).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          this.formData.reset()
        }
      });
    }

  }

  ngOnInit() {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        console.log(data)
        this.categories = data
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('complete');
      }
    })
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
  }

}
