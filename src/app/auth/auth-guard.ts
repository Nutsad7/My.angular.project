// import { CanActivate, Router } from "@angular/router";
// import { AuthService } from "./auth.service";
// import { Injectable } from "@angular/core";

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {

//   constructor(private authService: AuthService, private router: Router) {}
 
//   canActivate(): boolean {

//     if (this.authService.isAutenticated()) {

//       return true;

//     }
 
//     this.router.navigate(['/login']);

//     return false;

//   }

// }


import { CanActivate, Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
