import { mapToCanActivate, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'menu', pathMatch: 'full' },
  { path: 'menu', loadComponent: () => import('./menu/menu.component').then(m => m.MenuComponent) },
  { path: 'cart', canActivate:[AuthGuard], loadComponent: () => import('./cart/cart.component').then(m => m.CartComponent) },
  { path: 'login', loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent) },
  { path: 'signup', loadComponent: () => import('./auth/signup/signup.component').then(m => m.SignupComponent) },
];



// @NgModule({
//   imports: [
//     FormsModule,
//     HttpClientModule
//   ],
// })


