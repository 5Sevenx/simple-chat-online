import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Pusher from 'pusher-js';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { MainServiceService } from './main-service.service';
import { User } from './interface/user.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit{
  // Other
  username:string = '';
  message: string = '';
  messages = [
    { username: '', message: '' },
  ];
  // Injection
  constructor(
    private http: HttpClient,private service: MainServiceService) {}


  // Pusher
  ngOnInit(): void {
    Pusher.logToConsole = true;

    const pusher = new Pusher('de0d85dfc195bed6c21c', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('chat');
    channel.bind('message', (data: any) => {
      this.messages.push(data);
    });


    const user = this.service.getCurrentUser();
    if (user) {
      this.username = user.name;
      console.log('Current user:', this.username);
    } else {
      console.log('No user found');
    }


    if (!this.username) {
      this.username = this.service.getUsername();
      if (this.username) {
        this.service.getUserByName(this.username).subscribe(user => {
          this.service.setCurrentUser(user);
          this.username = user.name;
          console.log('User fetched from API:', this.username);
        });
      }
    }
    const user2 = this.service.getCurrentUser();
    console.log('Current user from service:', user); 
    if (user2) {
      this.username = user2.name;
    }
  }




  // http post
  submit():void{
    this.http.post('http://localhost:8000/api/messages',{username:this.username,message:this.message}
    ).subscribe( () => this.message = '')
  }



}
