import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MainServiceService } from '../main-service.service';
import { environments } from '../../environments/environmets';
import { User } from '../interface/user.interface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: ``
})
export class ProfileComponent implements OnInit {
  currentname: string = '';
  newName: string = '';
  private baseUrl = environments.baseUrl;
  constructor(
    private http: HttpClient,
    private service: MainServiceService,
    private router:Router
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

  submit(): void {
    const user = this.service.getCurrentUser();
    if (user && this.newName) {

      this.http.put(`${this.baseUrl}/update/${user.id}`, { nickname: this.newName })
        .subscribe(
          (response) => {
            this.currentname = this.newName;
            console.log('User updated successfully');
            this.router.navigate(['/chat']);
          },
          (error) => {
            console.error('Error updating user:', error);
          }
        );
    } else {
      console.log('Username is not defined or new name is empty');
    }
  }

  submitOnDelete(): void {
    const user = this.service.getCurrentUser();
    if (user) {
      const confirmation = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');

      if (confirmation) {
        this.http.delete(`${this.baseUrl}/delete/${user.id}`)
          .subscribe(
            () => {
              console.log('User deleted successfully');
              this.router.navigate(['/auth']);
            },
            (error) => {
              console.error('Error deleting user:', error);
            }
          );
      } else {
        console.log('Deletion cancelled by the user.');
      }
    }
  }



}
