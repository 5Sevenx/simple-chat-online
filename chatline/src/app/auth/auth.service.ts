import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../environments/environmets';
import { User } from '../main/interface/user.interface';

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





}
