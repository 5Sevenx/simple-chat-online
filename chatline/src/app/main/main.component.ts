import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MainServiceService } from './main-service.service';
import Pusher from 'pusher-js';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit {
  username: string = '';
  message: string = '';
  img:string = '';
  messages = [
    { username: '', message: '', avatar: '' },
  ];


  constructor(
    private http: HttpClient,
    private service: MainServiceService
  ) {}

  ngOnInit(): void {
    this.loadUserAvatar();
    // Pusher initialization
    Pusher.logToConsole = true;
    const pusher = new Pusher('de0d85dfc195bed6c21c', {
      cluster: 'eu'
    });
    const channel = pusher.subscribe('chat');
    channel.bind('message', (data: any) => {
      this.messages.push(data);
    });


    //below im doing the same thing twice because i want the same result for both


    this.img = this.service.getImgUser();

    if (this.img) {
      const currentUserImg = this.service.getCurrentUser();
      if (currentUserImg) {
        this.service.checkAndUpdateUserImg(currentUserImg).subscribe(
          (updatedUserImg) => {
            if (updatedUserImg.avatarUrl !== this.img) {
              this.img = updatedUserImg.avatarUrl;
            }
            console.log('User image checked and updated:', updatedUserImg);
          },
          (err) => {
            console.error('Error checking or updating user image:', err);
          }
        );
      }
    }

    this.username = this.service.getUsername();

    if (this.username) {
      const currentUser = this.service.getCurrentUser();
      if (currentUser) {
        this.service.checkAndUpdateUser(currentUser).subscribe(
          (updatedUser) => {
            if (updatedUser.nickName !== this.username) {
              this.username = updatedUser.nickName;
            }
            console.log('User checked and updated:', updatedUser);
          },
          (err) => {
            console.error('Error checking or updating user:', err);
          }
        );
      }
    } else {
      console.log('User is not logged in');
    }
}


  submit(): void {
    if (this.username) {
      this.http.post('http://localhost:8000/api/messages', { username: this.username, message: this.message, avatar: this.img })
        .subscribe(() => this.message = '');
    } else {
      console.log('Username is not defined');
    }
  }


  loadUserAvatar(): void {
    const user = this.service.getCurrentUser();
    if (user && user.id !== undefined) {
      this.service.getAvatarUrl(user.id).subscribe(
        (url: string) => {
          this.img = url;
        },
        (error) => {
          console.error('Error fetching avatar URL:', error);
        }
      );
    }
  }
}
