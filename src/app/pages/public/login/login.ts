import { Component } from '@angular/core';
import { FormControl, AbstractControl, ValidationErrors, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  formData!: FormGroup;

  constructor(private authService: AuthService, private router: Router){
    this.formData = new FormGroup({
      userEmail: new FormControl('', [Validators.required, Validators.email, emailMustEndWithCom ]),
      userPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)])
    });
  }

  onSubmit(){
    if(this.formData.valid){
      console.log(this.formData.value);

      this.authService.loginUser(this.formData.value).subscribe({
      next: ( data: any ) => {
        this.authService.saveLocalStorage('token', data.token)
        this.router.navigateByUrl('dashboard')
      },
      error: ( error ) => {
        console.error( error );
        this.router.navigateByUrl('register')
      },
      complete: () => {
        this.formData.reset();
      }
      });

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