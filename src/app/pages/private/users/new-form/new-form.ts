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
    users = [];

constructor( private userService: usersServices){
    this.formData= new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
      email: new FormControl('',[Validators.required, Validators.email]),
      phoneNumber: new FormControl('',[Validators.required])

    });
  };

  onSubmit(){
    if(this.formData.valid){
      console.log(this.formData.value)

    }this.formData.reset();
  }
  
  ngOnInit(){console.log('ngOnInit');
  }

  ngOnChanges(){
    this.userService.getUsers().subscribe({
      next: ( data ) => {
        console.log(  );

      }
    })
    console.log('ngOnChanges');
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

}

