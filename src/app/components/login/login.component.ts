import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Auth, sendEmailVerification } from '@angular/fire/auth';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  unverifiedUser: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private auth: Auth,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password)
        .then(() => {
          this.unverifiedUser = false;
          this.router.navigate(['/survey-list']);
        })
        .catch(error => {
          if (error.message.includes('megerősítve')) {
            this.unverifiedUser = true;
          }
          alert(error.message);
        });
    }
  }

  resendVerificationEmail(): void {
    const user = this.auth.currentUser;
    if (user && !user.emailVerified) {
      sendEmailVerification(user).then(() => {
        alert('📩 A megerősítő e-mail újra elküldve!');
      });
    }
  }
}
