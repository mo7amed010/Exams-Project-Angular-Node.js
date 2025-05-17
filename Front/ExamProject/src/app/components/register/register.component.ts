import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';  
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';  
import { AuthService } from '../../services/auth.service';  
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['student', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.errorMessage = '';
      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          if (response.status === 'success') {
            console.log('Registration successful:', response);
            this.router.navigate(['/login']);
          }
        },
        error: (error) => {
          this.errorMessage = error.error.message || 'An error occurred during registration';
          console.error('Registration failed:', error);
        }
      });
    } else {
      this.errorMessage = 'Please fill in all required fields correctly';
    }
  }
}