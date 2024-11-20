import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../environments/environmets';
import { User } from '../main/interface/user.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environments.baseUrl;
  private user?:User;

  constructor(private http: HttpClient) { }



  //User
  get currentUser():User|undefined{
    if(!this.user) return undefined;
    return structuredClone(this.user)
  }

  //Creating user
  AddUser(name: string, passwd: string): void {
    const userData = { NickName: name, Passwd: passwd };
    // suscribe to observable for tracking changes
    this.http.put<User>(`${this.baseUrl}/update`, userData).subscribe({
      next: (response) => {
        console.log('User added:', response);
      },
      error: (error) => {
        console.error('Error adding user:', error);
      },
      complete: () => {
        console.log('Request complete');
      }
    });
  }

  isAuthentiated(): boolean {
    return !!this.currentUser;
  }

  LogUser(username: string, password: string): Observable<boolean> {
    const loginData = { username, password };
    return this.http.post<User>(`${this.baseUrl}/auth/login`, loginData).pipe(
      tap(user => {
        this.user = user; 
      }),
      map(() => true),
      catchError(() => of(false))
    );
  }



}
