import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../environments/environmets';
import { User } from '../main/interface/user.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { MainServiceService } from '../main/main-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environments.baseUrl;
  private user?:User;

  constructor(private http: HttpClient,private mainservice:MainServiceService) { }
  //User
  get currentUser():User|undefined{
    if(!this.user) return undefined;
    return structuredClone(this.user)
  }
  //Creating user
  AddUser(name: string, passwd: string): Observable<User> {
    const userData = { NickName: name, Passwd: passwd, avatarUrl: 'https://banner2.cleanpng.com/20180622/tqt/aazen4lhc.webp'};
    return this.http.post<User>(`${this.baseUrl}/create`, userData).pipe(
      tap(user => {
        this.mainservice.setCurrentUser((user as any).user);
        console.log('User created:', user);
      })
    );
  }
  //LogUser
  LogUser(name: string, passwd: string): Observable<User | null> {
    const loginData = { NickName: name, Passwd: passwd };
    return this.http.post<User>(`${this.baseUrl}/getall`, loginData).pipe(
      tap(user => {
        this.mainservice.setCurrentUser(user);
        console.log('User logged in:', user);
      }),
      map(user => user || null),
      catchError(() => of(null))
    );
  }
}
