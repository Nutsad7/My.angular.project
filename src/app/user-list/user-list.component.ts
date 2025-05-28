import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html'
})
export class UserListComponent {
  users = [
    { "id": "U001", "first_name": "Alice", "last_name": "Morgan" },
    { "id": "U002", "first_name": "Brian", "last_name": "Cooper" },
    { "id": "U003", "first_name": "Carla", "last_name": "Nguyen" },
    { "id": "U004", "first_name": "David", "last_name": "Hernandez" },
    { "id": "U005", "first_name": "Eva", "last_name": "Schmidt" },
    { "id": "U006", "first_name": "Frank", "last_name": "Patel" },
    { "id": "U007", "first_name": "Grace", "last_name": "Kim" },
    { "id": "U008", "first_name": "Henry", "last_name": "Lopez" },
    { "id": "U009", "first_name": "Isla", "last_name": "Brown" },
    { "id": "U010", "first_name": "Jake", "last_name": "Wilson" }
  ];

  constructor(private router: Router) {}

  goToUser(id: string) {
    this.router.navigate(['/user', id]);
  }
}


