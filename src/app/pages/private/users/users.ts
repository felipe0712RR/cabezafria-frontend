import { Component } from '@angular/core';
import { UserService } from '../../../services/users-service';


@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users {
  constructor ( private usersServise: UserService) {}


  ngOnInit() {
    this.usersServise.getUsers().subscribe({
      next: ( data ) => {
        console.log( data );
      },
      error: ( error) => {
        console.error( error );
      },
      complete: () => {}
    });
  }




}

