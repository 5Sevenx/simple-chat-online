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

  // Injection
  constructor(
    private http: HttpClient,
    private service: MainServiceService
  ) {}


  // Pusher
  ngOnInit(): void {
    Pusher.logToConsole = true;

    const pusher = new Pusher('de0d85dfc195bed6c21c', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('chat');
    channel.bind('message', (data: any)  => {
      this.messages.push(data)
    });

    const user = this.currUser();
    if (user) {
      this.username = user.name;
    }


  }

  // Other
  username:string = '';
  message: string = '';
  messages = [
    { username: '', message: '' },
  ];

  // http post
  submit():void{
    this.http.post('http://localhost:8000/api/messages',{username:this.username,message:this.message}
    ).subscribe( () => this.message = '')
  }

  currUser():User | null{
    return this.service.getCurrentUser()
  }

}
