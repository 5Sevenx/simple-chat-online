import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
})
export class AuthPageComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}


  onSubmit() {

    this.authService.AddUser(this.username, this.password)
    console.log('Submitting:', this.username, this.password);
  }
}
