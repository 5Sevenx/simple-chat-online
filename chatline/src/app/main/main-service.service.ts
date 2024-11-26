import { Injectable } from '@angular/core';
import { User } from './interface/user.interface';
import { HttpClient } from '@angular/common/http';
import { environments } from '../environments/environmets';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {
  private currentUser: User | null = null;
  private baseUrl = environments.baseUrl;

  constructor(private http: HttpClient) {}

  getCurrentUser(): User | null {
    if (!this.currentUser) {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        this.currentUser = JSON.parse(storedUser);
      }
    }
    return this.currentUser;
  }

  setCurrentUser(user: User): void {
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getUsername(): string {
    const user = this.getCurrentUser();
    return user ? user.nickName : '';
  }

  clearCurrentUser(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  checkAndUpdateUser(user: User): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/getuser/${user.id}`).pipe(
      map(existingUser => {
        if (existingUser && existingUser.nickName !== user.nickName) {
          user.nickName = existingUser.nickName;
          this.setCurrentUser(user);
        }
        return user;
      }),
      catchError((error) => {
        console.error('Error checking user:', error);
        return throwError(() => new Error('User not found or error occurred.'));
      })
    );
  }

  UpdateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/update/${user.id}`, user);
  }
}
