

// import { Injectable } from "@angular/core";
// import { IAuthService } from "./auth-service.interface";

// @Injectable( {
// providedIn: "root"
// }
// )
// export class AuthService implements IAuthService{
//     isAutenticated(): boolean {
       
//     console.log(!!localStorage.getItem("access_token"), "asdasd")
// return !!localStorage.getItem("access_token")
//     }

//      isLoggedIn(): boolean {
//     return !!localStorage.getItem('token'); // adjust key as needed
//   }

//    logOut(): void {
//     localStorage.removeItem('token');
//   }

// }



import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  loginStatus$ = this.loggedIn.asObservable();

  private hasToken(): boolean {
    return !!localStorage.getItem("access_token");
  }

  isAuthenticated(): boolean {
    return this.hasToken();
  }

  logOut(): void {
    localStorage.removeItem('access_token');
    this.loggedIn.next(false);
  }

  setLoggedIn(): void {
    this.loggedIn.next(true);
  }
}



