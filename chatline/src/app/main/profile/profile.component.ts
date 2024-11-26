import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MainServiceService } from '../main-service.service';
import { User } from '../interface/user.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: ``
})
export class ProfileComponent implements OnInit {
  currentname: string = '';
  newName: string = ''; 

  constructor(
    private http: HttpClient,
    private service: MainServiceService
  ) {}

  ngOnInit(): void {
    this.updateCurrentName();
  }

  updateCurrentName(): void {

    this.currentname = this.service.getUsername();
    if (!this.currentname) {
      this.service.clearCurrentUser();
    }
  }


  updateUserName(): void {
    const user = this.service.getCurrentUser();
    if (user) {
      user.nickName = this.newName;
      this.service.UpdateUser(user).subscribe({
        next: (updatedUser) => {
          console.log('User successfully updated:', updatedUser);
          this.updateCurrentName();
        },
        error: (err) => {
          console.error('Error updating user:', err);
        },
      });
    }
  }
}
