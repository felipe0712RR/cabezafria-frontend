import { Component } from '@angular/core';
import { UserService } from '../../../services/users-service';


@Component({
  selector: 'app-get-users',
  imports: [],
  templateUrl: './get-users.html',
  styleUrl: './get-users.css'
})
export class GetUsers {
  constructor ( private userService: UserService) {}

  users: any = [];

  ngOnInit() {
    this.userService.getUsers().subscribe({
      next: ( data ) => {
        console.log( data );
        this.users = data;
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

