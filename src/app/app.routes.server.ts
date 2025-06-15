// import { RenderMode, ServerRoute } from '@angular/ssr';

// export const serverRoutes: ServerRoute[] = [
//   {
//     path: '**',
//     renderMode: RenderMode.Prerender
//   }
// ];


// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { CartComponent } from './cart/cart.component';
// import { MenuComponent } from './menu/menu.component';
// import { LoginComponent } from './auth/login/login.component';

// const routes: Routes = [
//   { path: '', component: MenuComponent },
//   { path: '', component: LoginComponent },
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule {}


import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
