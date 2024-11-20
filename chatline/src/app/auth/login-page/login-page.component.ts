import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ValidatorService } from '../validators/validators.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private validatorService: ValidatorService,
    private router: Router 
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        this.validatorService.validateUserCredentials('', '')
      ]],
    });
  }

  // validation when touched
  isFieldInvalid(field: string): boolean {
    return !!this.loginForm.controls[field].errors && this.loginForm.controls[field].touched;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { username, password } = this.loginForm.value;
    this.authService.LogUser(username, password).subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.router.navigate(['/main']);
      } else {
        console.log('Invalid login credentials');
      }
    });
  }
}
