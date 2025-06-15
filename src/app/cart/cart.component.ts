import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';



@Component({
  standalone: true,
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class CartComponent implements OnInit {
  URL = 'https://restaurant.stepprojects.ge';
  cartItems: any[] = [];
  groupedItems: any[] = [];
  loading = false;
  total = 0;
  showConfirmation = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.fetchCart();
  }

  fetchCart() {
    this.loading = true;
    this.http.get<any[]>(`${this.URL}/api/Baskets/GetAll`).subscribe({
      next: (data) => {
        this.groupAndRender(data);
        this.loading = false;
      },
      error: () => {
        console.error('Error fetching cart');
        this.loading = false;
      }
    });
  }

  groupAndRender(data: any[]) {
    const grouped: any = {};
    this.total = 0;

    data.forEach(item => {
      const id = item.product.id;
      if (!grouped[id]) {
        grouped[id] = { ...item, quantity: 1 };
      } else {
        grouped[id].quantity += 1;
      }
    });

    this.groupedItems = Object.values(grouped);
    this.groupedItems.forEach(item => {
      const subtotal = item.product.price * item.quantity;
      this.total += subtotal;
    });
  }

  increaseQuantity(productId: number) {
    this.http.post(`${this.URL}/api/Baskets/AddToBasket`, {
      productId,
      quantity: 1
    }).subscribe(() => this.fetchCart());
  }

  decreaseQuantity(productId: number) {
    this.http.delete(`${this.URL}/api/Baskets/DeleteProduct/${productId}`).subscribe(() => this.fetchCart());
  }

  submitOrder(form: any) {
    if (form.invalid) {
      alert('Please fill in all fields before submitting.');
      return;
    }

    this.showConfirmation = true;
    setTimeout(() => {
           this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  this.router.navigate(['/menu']);
});
    }, 3000);
  }
}

          
      
