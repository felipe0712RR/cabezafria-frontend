import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  imports: [ ReactiveFormsModule ],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users {
  formData!: FormGroup;

  constructor() {
    this.formData = new FormGroup({
      name: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      phoneNumber: new FormControl(),
      role: new FormControl()
    });
  }
}
