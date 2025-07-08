import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../../../services/category-service';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../../services/product-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css'
})
export class ProductForm {
  formData!: FormGroup;
  categories: any = [];
  product: any = [];
  showSize = false;

  sizeMeasurement = [
    '6 7/8', '7', '7 1/8', '7 1/4', '7 3/8',
    '7 1/2', '7 5/8', '7 3/4', '7 7/8', '8'
  ];

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router
  ) {
    this.formData = new FormGroup({
      productName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
      productDescription: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]),
      productPrice: new FormControl(0, [Validators.required, Validators.min(1)]),
      productType: new FormControl('ajustable', [Validators.required]),
      productSize: new FormControl('N/a', [Validators.required]),
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
      this.productService.registerProduct(this.formData.value).subscribe({
        next: (data) => {
          console.log(data);
          this.product = data
          this.router.navigateByUrl('/dashboard/products')
        },
        error: (error) => {
          console.log(error);

          console.error();

        },
        complete: () => { }
      });
    }
    this.formData.reset();
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

  setValueSize(value: boolean): void {
    this.showSize = value;
  }
}
