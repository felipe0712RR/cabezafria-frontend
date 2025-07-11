import { Component } from '@angular/core';
import { UserService } from '../../../services/users-service';


@Component({
  selector: 'app-get-users',
  imports: [],
  templateUrl: './get-users.html',
  styleUrl: './get-users.css'
})
export class GetUsers {
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

