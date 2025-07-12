import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth-service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginUser {
  formData!: FormGroup;

  constructor(private authServices: AuthService, private router: Router) {
    this.formData = new FormGroup({
      userEmail: new FormControl('', [Validators.required, Validators.email]),
      userPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
      ]),
    });
  }

  onLogin(): void {
    this.authServices.login();
  }

  onSubmit() {
    if (this.formData.valid) {
      console.log(this.formData.value);

      this.authServices.loginUser(this.formData.value).subscribe({
        next: (data: any) => {
          console.log('Login response:', data);
          this.authServices.saveLocalStorage('token', data.token);
          this.authServices.login();
          this.router.navigateByUrl('dashboard');
          Swal.fire({
            title: "Hola..!",
            text: "Nos alegra tenerte de vuelta!",
            icon: "success",
            timer: 1800
          });

        },
        error: (error) => {
          console.error(error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "El usuario no existe!",
            footer: '<a href="dashboard/users/new">No tienes cuenta aún?</a>'
          });
        },
        complete: () => {
          this.formData.reset();
        },
      });
    }
  }
}
