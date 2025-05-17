import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';  
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';  
import { AuthService } from '../../services/auth.service';  
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.errorMessage = '';
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.status === 'success') {
            localStorage.setItem('token', res.token);
            localStorage.setItem('role', res.role);
            // Redirect based on role
            if (res.role === 'admin') {
              this.router.navigate(['/dashboard']);
            } else {
              this.router.navigate(['/exams']);
            }
          }
        },
        error: (err) => {
          this.errorMessage = err.error.message || 'An error occurred during login';
          console.error('Login error:', err);
        }
      });
    }
  }
}
