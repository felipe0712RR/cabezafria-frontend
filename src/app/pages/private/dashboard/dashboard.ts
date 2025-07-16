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

  navigateToViewUsers() {
    this.router.navigate(['/dashboard/users']);
  }

}
