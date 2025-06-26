import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../../services/users';

@Component({
  selector: 'app-new-form',
  imports: [ ReactiveFormsModule ],
  templateUrl: './new-form.html',
  styleUrl: './new-form.css'
})
export class ProductNewForm {
    formData!: FormGroup;
    users: any =[];

constructor( private userService: UserService){
    this.formData= new FormGroup({
      userName: new FormControl( '',[Validators.required] ),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
      email: new FormControl('',[Validators.required, Validators.email]),
      phoneNumber: new FormControl('',[Validators.required])

    });
  };

  onSubmit(){
    //   console.log(
    //     this.formData.valid,
    //     this.formData.invalid,
    //     this.formData.pristine,
    //     this.formData.dirty,
    //     this.formData.touched
    // );

    if(this.formData.valid){
      console.log( this.formData.value)
      this.userService.registerUsers(this.formData.value).subscribe({
        next: ( data ) => {
          console.log( data );
        },
        error: ( error ) => {
          console.log( error );
        },
        complete: () => {
          
        }
      })

    }this.formData.reset();
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


