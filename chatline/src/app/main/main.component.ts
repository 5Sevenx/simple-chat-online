import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MainServiceService } from './main-service.service';
import Pusher from 'pusher-js';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  username: string = '';
  message: string = '';
  messages = [
    { username: '', message: '' },
  ];

  constructor(
    private http: HttpClient,
    private service: MainServiceService
  ) {}

  ngOnInit(): void {
    // Pusher initialization
    Pusher.logToConsole = true;
    const pusher = new Pusher('de0d85dfc195bed6c21c', {
      cluster: 'eu'
    });
    const channel = pusher.subscribe('chat');
    channel.bind('message', (data: any) => {
      this.messages.push(data);
    });


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
      this.http.post('http://localhost:8000/api/messages', { username: this.username, message: this.message })
        .subscribe(() => this.message = '');
    } else {
      console.log('Username is not defined');
    }
  }
}
