import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'app-login',
  imports: [ ReactiveFormsModule ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  formData!: FormGroup;

  constructor( private authServices: AuthService, private router: Router) {
    this.formData = new FormGroup({
      userEmail: new FormControl( '', [ Validators.required, Validators.email ] ),
      userPassword: new FormControl( '', [ Validators.required, Validators.minLength( 8 ), Validators.maxLength( 20) ] )
    });
  }

onsubmit() {
  if( this.formData.valid){
    console.log( this.formData.value);

    this.authServices.loginUser( this.formData.value ).subscribe( {
      next: ( data: any ) => { 
        console.log('Login response:', data);
        this.authServices.saveLocalStorage( 'token', data.token )
        this.router.navigateByUrl( 'dashboard' );

      },

      error: ( error ) => {
        console.error( error );
        this.router.navigateByUrl( "register" );
      },
      complete:() => {
        this.formData.reset();
      }
    });
  }
}
};
