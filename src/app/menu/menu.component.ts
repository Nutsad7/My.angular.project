

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth/auth.service';


@Component({
  standalone: true,
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  imports: [CommonModule, FormsModule, RouterModule]
  
})


export class MenuComponent implements OnInit {






  URL = 'https://restaurant.stepprojects.ge';

  categories: any[] = [];
  products: any[] = [];
  popupMessage = '';
  showPopupFlag = false;

  // Filters
  searchText = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  selectedCategory = '';
  selectedSpiciness = '';
  vegetarian = false;
  nuts = false;
  auth: any;
  router: any;

  resetFilters() {
  this.searchText = '';
  this.minPrice = null;
  this.maxPrice = null;
  this.selectedCategory = '';
  this.selectedSpiciness = '';
  this.vegetarian = false;
  this.nuts = false;
  this.applyFilters();
}


  constructor(private http: HttpClient,
    public authService: AuthService  ) {}



// get isLoggedIn(): boolean {
//   return typeof window !== 'undefined' && !!localStorage.getItem('token');
// }



 get isLoggedIn(): boolean {

  
    return this.authService.isAuthenticated();
  }

  ngOnInit(): void {
    
    this.loadCategories();
    this.applyFilters();

   // If already logged in (e.g., page reload)
   if (this.authService.isAuthenticated()) {
    
      this.loadCategories();
      this.applyFilters();
    }

  
  }


  loadCategories() {
    this.http.get<any[]>(`${this.URL}/api/Categories/GetAll`).subscribe({
      next: data => {
        this.categories = data;
      },
      error: err => {
        console.error('Error loading categories:', err);
      }
    });
  }

applyFilters() {
  let params = new HttpParams()
    .set('minPrice', this.minPrice?.toString() || '0')
    .set('maxPrice', this.maxPrice?.toString() || '9999')
    .set('categoryId', this.selectedCategory || '')
    .set('page', '1')
    .set('pageSize', '100');

  const url = `${this.URL}/api/Products/GetFiltered`;

  console.log('📡 API CALL with params:', params.toString());

  this.http.get<any>(url, { params }).subscribe({
    next: data => {
      let products = Array.isArray(data) ? data : data.products || [];

    
      if (this.searchText.trim()) {
        products = products.filter((d: { name: string; }) =>
          d.name.toLowerCase().includes(this.searchText.trim().toLowerCase())
        );
      }

   
      products = products.filter((d: { price: number; }) =>
        d.price >= (this.minPrice ?? 0) &&
        d.price <= (this.maxPrice ?? 9999)
      );

    
      if (this.vegetarian) {
        products = products.filter((d: { vegeterian: any; }) => d.vegeterian);
      }
      if (this.nuts) {
        products = products.filter((d: { nuts: any; }) => d.nuts);
      }
      if (this.selectedSpiciness !== '') {
        products = products.filter((d: { spiciness: string; }) => d.spiciness == this.selectedSpiciness);
      }

      this.products = products;
      console.log('✅ Filtered products:', this.products);
    },
    error: err => {
      console.error('❌ Error loading products:', err);
      this.products = [];
    }
  });
}


  addToCart(dish: any) {
    const data = {
      quantity: 1,
      price: dish.price,
      productId: +dish.id
    };

    this.http.post(`${this.URL}/api/Baskets/AddToBasket`, data).subscribe({
      next: () => {
        this.showPopup(`${dish.name} added to cart!`);
      },
      error: err => {
        console.error('Error adding to cart:', err);
      }
    });
  }

  showPopup(message: string) {
    this.popupMessage = message;
    this.showPopupFlag = true;
    setTimeout(() => {
      this.showPopupFlag = false;
    }, 2000);
  }

  
  logout(): void {
    this.authService.logOut();
    this.router.navigate(['/menu']);
  }



};















