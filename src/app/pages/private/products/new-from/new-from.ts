import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-from',
  imports: [ReactiveFormsModule],
  templateUrl: './new-from.html',
  styleUrl: './new-from.css'
})
export class ProductNewFrom {
  formData!: FormGroup;

  constructor(){
    this.formData= new FormGroup({
      name: new FormControl(),
      description: new FormControl(),
      price: new FormControl(),
      stock: new FormControl(),
      urlImage: new FormControl(),
      category: new FormControl(),
      state: new FormControl(),
    });
  };

  onSubmit(){
    console.log(this.formData.value);
    
  }
}
