import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: [''],
      password: [''],
    });
  }

  onSubmit() {
    const { username, password } = this.loginForm.value;

    if (!username || !password) {
      this.errorMessage = 'Please enter both username and password';
      return;
    }

    this.authService.LogUser(username, password).subscribe(user => {
      if (user) {
        this.router.navigate(['/chat']);
      } else {
        this.errorMessage = 'Invalid username or password';
      }
    });
  }
}
