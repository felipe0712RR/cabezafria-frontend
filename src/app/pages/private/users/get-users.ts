import { Component } from '@angular/core';
import { UserService } from '../../../services/users-service';
import { AuthService } from '../../../services/auth-service';


@Component({
  selector: 'app-get-users',
  imports: [],
  templateUrl: './get-users.html',
  styleUrl: './get-users.css'
})
export class GetUsers {
  constructor ( private userService: UserService, private authService: AuthService) {}

  users: any = [];
  userData!: any 

  ngOnInit() {
    this.authService.userData$.subscribe((userData)=>{      
      this.userData = userData
    })
    this.userService.getUsers().subscribe({
      next: ( data ) => {
        this.users = (data as Array<any>).filter((user) => user._id !== this.userData._id);
      },
      error: ( error) => {
        console.error( error );
      },
      complete: () => {}
    });
  }
  
    onDelete(id: string) {
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




}

