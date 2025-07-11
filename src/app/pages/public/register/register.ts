import { Component } from '@angular/core';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/users-service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-new-user',
    imports: [ReactiveFormsModule],
    templateUrl: './register.html',
    styleUrl: './register.css',
})
export class CreateNewUser {
    formData!: FormGroup;
    users: any = [];

    constructor(private userService: UserService, private router: Router) {
    this.formData = new FormGroup({
        userName: new FormControl('', [Validators.required]),
        userPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        ]),
        userEmail: new FormControl('', [Validators.required, Validators.email]),
        userPhoneNumber: new FormControl('', [Validators.required]),
    });
    }

    onSubmit() {
    //   console.log(
    //     this.formData.valid,
    //     this.formData.invalid,
    //     this.formData.pristine,
    //     this.formData.dirty,
    //     this.formData.touched
    // );

    if (this.formData.valid) {
        console.log(this.formData.value);
        this.userService.registerUsers(this.formData.value).subscribe({
        next: (data) => {
            console.log(data);
            Swal.fire({
                title: "Usuario Registrado!",
                text: "Genial.!, Ahora Inicia Sesión..",
                icon: "success"
                });
                this.router.navigateByUrl('login')
        },
        error: (error) => {
            console.log(error);
        },
        complete: () => {},
        });
    }
    this.formData.reset();
    }
    ngOnDestroy() {
    console.log('ngOnDestroy');
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
