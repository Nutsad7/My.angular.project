
// import { Injectable } from "@angular/core";
// import { BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: "root"
// })
// export class AuthService {
//   private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

//   loginStatus$ = this.loggedIn.asObservable();

//   private hasToken(): boolean {
//     return !!localStorage.getItem("access_token");
//   }
  

//   isAuthenticated(): boolean {
//     return this.hasToken();
//   }

//   logOut(): void {
//     localStorage.removeItem('access_token');
//     this.loggedIn.next(false);
//   }

//   setLoggedIn(): void {
//     this.loggedIn.next(true);
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
    return typeof window !== 'undefined' && !!localStorage.getItem("access_token");
  }

  isAuthenticated(): boolean {
    return this.hasToken();
  }

  logOut(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
    }
    this.loggedIn.next(false);
  }

  setLoggedIn(): void {
    this.loggedIn.next(true);
  }
}
