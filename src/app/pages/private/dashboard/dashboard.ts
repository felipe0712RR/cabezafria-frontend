import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class AdminDashboard {

  constructor(private router: Router) { }

  navigateToCreateCategory() {
    this.router.navigate(['/dashboard/categories/new']);
  }

  navigateToCreateProduct() {
    this.router.navigate(['/dashboard/products/new']);
  }

  navigateToViewProducts() {
    this.router.navigate(['/dashboard/products'])
  }

  navigateToViewUsers() {
    this.router.navigate(['/dashboard/users']);
  }
<<<<<<< HEAD

  navigateToViewCategory(){
    this.router.navigate(['/dashboard/categories']);
  }
=======
  navigateToViewCategory(){
    this.router.navigate(['/dashboard/categories']);
  }
>>>>>>> 50739836b519a2e6975b23d96c45c02e34216c3d
}

