import { Component } from '@angular/core';
import { ProductService } from '../../../../services/product-service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReviewService } from '../../../../services/review-service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../services/users-service';
import { AuthService } from '../../../../services/auth-service';

@Component({
  selector: 'app-new-reviews',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-reviews.html',
  styleUrl: './new-reviews.css'
})
export class NewReviews {
  formData!: FormGroup;
  review!: any;
  userData!: any;
  productsData: any = [];
  productData!: any;

    constructor(
    private reviewService: ReviewService,
    private authService: AuthService,
    private productService: ProductService,
    private router: Router
  ) {
    this.formData = new FormGroup({
      reviewUserId: new FormControl('', [Validators.required]),
      reviewProductId: new FormControl('', [Validators.required]),
      reviewQualification: new FormControl(1, [Validators.required, Validators.min(1)]),
      reviewContent: new FormControl('', [Validators.required, Validators.max(1000)]),
    });
  };

  onSubmit() {
    if (this.formData.valid) {
      console.log(this.formData.value);
      this.reviewService.createReview(this.formData.value).subscribe({
        next: (data) => {
          console.log(data);
          this.review = data
          //this.router.navigateByUrl('/dashboard/products')
        },
        error: (error) => {
          console.log(error);
          console.error(error);
        },
        complete: () => { }
      });
    }
    this.formData.reset();
  }

  ngOnInit(){
    this.authService.userData$.subscribe((userData)=>{      
      this.userData = userData
    })
    this.productService.getProducts().subscribe({
      next: (data) => {
        console.log(data);
        this.productsData = data;
        this.productsData = (data as Array<any>).filter((products) => products._id !== this.productsData._id);
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => { }
    });
  }

  selectProduct(id: any){
    this.productService.getProductsId(id).subscribe({
      next: (data) => {
        console.log(data);
        this.productData = data;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => { }
    });
  }

}

