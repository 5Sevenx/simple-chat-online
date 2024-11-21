import { Injectable } from '@angular/core';
import { User } from './interface/user.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from '../environments/environmets';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {
  private currentUser: User | null = null;
  private baseUrl = 'http://localhost:8000/api';
  constructor(private http: HttpClient) {}


  getCurrentUser(): User | null {
    return this.currentUser;
  }


  setCurrentUser(user: User): void {
    this.currentUser = user;
  }


  getUserByName(nickName: string): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/getname`, { NickName: nickName });
  }


  getUsername(): string {
    return this.currentUser ? this.currentUser.name : '';
  }
}
