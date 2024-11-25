import { Injectable } from '@angular/core';
import { User } from './interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {
  private currentUser: User | null = null;

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  setCurrentUser(user: User): void {
    this.currentUser = user;
  }

  getUsername(): string {
    return this.currentUser ? this.currentUser.nickName : '';
  }

  getUserLogin(): string {
    return this.currentUser ? this.currentUser.nickName : '';
  }

  getUserForLogin(): User {
    if (!this.currentUser) {
      throw new Error('No current user found');
    }
    return this.currentUser;
  }

}
