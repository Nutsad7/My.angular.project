import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],  // 🚀 ADD THIS!
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  signupForm: FormGroup;
  signupMessage: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: [null, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\+9955\d{8}$/)]],
      zipcode: ['', [Validators.required, Validators.pattern(/^[0-9]{4,6}$/)]],
      avatar: ['', Validators.required],
      gender: ['', Validators.required]
    });
  }

  onSubmit(): void {
    console.log('Signup data:', this.signupForm.value, 'Valid:', this.signupForm.valid);

    if (this.signupForm.valid) {
      const url = 'https://api.everrest.educata.dev/auth/sign_up';
      const signupData = this.signupForm.value;

      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });

      this.http.post<any>(url, signupData, { headers }).subscribe({
        next: (response) => {
          console.log('Signup success:', response);
          this.signupMessage = 'Account created! Please log in.';

          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        
      });
    } 
  }
}


