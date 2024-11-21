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
    channel.bind('message', (data: any)  => {
      this.messages.push(data)
    });

    this.username = this.service.getUsername();

    console.log('Username before check:', this.username);
    if (this.username) {
      console.log('holaaaa')
      this.service.getUserByName(this.username).subscribe(user => {
        this.service.setCurrentUser(user);
        this.username = user.name;
      });
    }

    const user = this.service.getCurrentUser();
    if (user){
      this.username = user.name
    }

  }



  // http post
  submit():void{
    this.http.post('http://localhost:8000/api/messages',{username:this.username,message:this.message}
    ).subscribe( () => this.message = '')
  }



}
