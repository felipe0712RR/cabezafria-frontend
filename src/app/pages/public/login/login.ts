import { Component } from '@angular/core';
import { FormControl, AbstractControl, ValidationErrors, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  formData!: FormGroup;

  constructor(){
    this.formData = new FormGroup({
      userEmail: new FormControl('', [Validators.required, Validators.email, emailMustEndWithCom ]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)])
    });
  }

  onSubmit(){
    if(this.formData.valid){
      console.log(this.formData.value);
    }
  }
}

function emailMustEndWithCom(control: AbstractControl): ValidationErrors | null {
  const email = control.value;
  if (email && typeof email === 'string' && !email.endsWith('.com')) {
    return { mustEndWithCom: true };
  }
  return null;
}