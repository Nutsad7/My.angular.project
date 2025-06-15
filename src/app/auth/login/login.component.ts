import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule, HttpClientModule,],


  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(8)])
  });

  loginMessage: string = '';
  authService: any;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loginForm.valueChanges.subscribe(value => {
      console.log('Form Value:', value);
    });
  }

  onSubmit(): void {
    console.log('Submitting:', this.loginForm.value, 'Valid:', this.loginForm.valid);

    if (this.loginForm.valid) {
      const url = 'https://api.everrest.educata.dev/auth/sign_in';
      const credentials = this.loginForm.value;

      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });

      this.http.post<any>(url, credentials, { headers }).subscribe({
        next: (response) => {
          console.log('Login success:', response);

         
          // Save token if present
          if (response.access_token) {
            localStorage.setItem('access_token', response.access_token);
            

 
          }

  


          // Redirect to menu
           this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  this.router.navigate(['/menu']);
});

        },

        
     
      });
    }
  }

 

}
