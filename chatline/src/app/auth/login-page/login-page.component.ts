import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: ``
})
export class LoginPageComponent {
  loginForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder) {
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
    this.authService.AddUser(username, password);
    console.log('Submitting:', username, password);
  }
}
