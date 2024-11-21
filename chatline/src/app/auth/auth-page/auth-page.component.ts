import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Route, Router } from '@angular/router';
import { ValidatorService } from '../validators/validators.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
})
export class AuthPageComponent {
  loginForm: FormGroup;

  constructor(private authService: AuthService,
    private fb: FormBuilder,
    private validatorService: ValidatorService,
    private router: Router ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // validation when touched
  isFieldInvalid(field: string): boolean {
    return !!this.loginForm.controls[field].errors && this.loginForm.controls[field].touched;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched(); // mark as touched for error
      return;
    }

    const { username, password } = this.loginForm.value;
    this.authService.AddUser(username, password).subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.router.navigate(['/main']);
      } else {
        console.log('Invalid login credentials');
      }
    });
  }
}
