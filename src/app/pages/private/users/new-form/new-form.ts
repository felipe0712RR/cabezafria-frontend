import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { usersServices } from '../../../../services/users-service';

@Component({
  selector: 'app-new-form',
  imports: [ ReactiveFormsModule ],
  templateUrl: './new-form.html',
  styleUrl: './new-form.css'
})
export class ProductNewForm {
    formData!: FormGroup;
    users: any =[];

constructor( private userService: usersServices){
    this.formData= new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
      email: new FormControl('',[Validators.required, Validators.email]),
      phoneNumber: new FormControl('',[Validators.required])

    });
  };

  onSubmit(){
      console.log(
        this.formData.valid,
        this.formData.invalid,
        this.formData.pristine,
        this.formData.dirty,
        this.formData.touched
    );

    if(this.formData.valid){
      console.log(this.formData.value)

    }this.formData.reset();
  }
  
  ngOnInit(){
      this.userService.getUsers().subscribe({
      next: ( data ) => {
        console.log( data );
        this.users = data;
      },
      error: ( error ) => {
        console.error( error );
      },
      complete: () => {
        console.log( 'complete' );
      }
    });
  }
  ngOnDestroy() {
    console.log( 'ngOnDestroy' );
  }
}
  // ngDoCheck(){console.log('ngDoCheck');
  // }

  // ngAfterContentInit(){console.log('ngAfterContentInit');
  // }

  // ngAfterContentChecked(){console.log('ngAfterContentChecked');
  // }

  // ngAfterViewInit(){console.log('ngAfterViewInit');
  // }

  // ngAfterViewChecked(){console.log('ngAfterViewChecked');
  // }

  // afterEveryRender(){console.log('afterEveryRender')}
  
  // ngOnDestroy(){console.log('ngOnDestroy');
  // }


