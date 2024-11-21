import { Injectable } from '@angular/core';
import { User } from './interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {
  private currentUser: User | null = null;

  constructor() {}


  getCurrentUser(): User | null {
    return this.currentUser;
  }

  
  setCurrentUser(user: User): void {
    this.currentUser = user;
  }
}
