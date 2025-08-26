import { Component } from '@angular/core';
import { UserService } from '../../../services/users-service';
import { AuthService } from '../../../services/auth-service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-get-users',
  imports: [],
  templateUrl: './get-users.html',
  styleUrl: './get-users.css'
})
export class GetUsers {
  constructor(private userService: UserService, private authService: AuthService) { }

  users: any = [];
  userData!: any

  ngOnInit() {
    this.authService.userData$.subscribe((userData) => {
      this.userData = userData
    })
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = (data as Array<any>).filter((user) => user._id !== this.userData._id);
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => { }
    });
  }

  onDelete(id: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "El usuario será eliminado.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, ¡eliminalo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        console.log(id)
        this.userService.deleteUsers(id).subscribe({

          next: (data) => {
            console.log(data);
            this.ngOnInit()
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => { }
        });
      }
    })


  }
}

