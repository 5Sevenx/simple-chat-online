import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ValidatorService {
  constructor(private http: HttpClient) {}

  // Simple password validator for length
  public passwordValidator = (control: FormControl): ValidationErrors | null => {
    const value: string = control.value || '';
    if (value.length < 6) {
      return { minLength: true }; // Error for password too short
    }
    return null; // No errors
  };

  // Async validator to check if credentials are valid
  public validateUserCredentials = (nickname: string, password: string) => {
    return (control: FormControl): ValidationErrors | null => {
      if (nickname && password) {
        return this.checkUserCredentials(nickname, password).pipe(
          map(isValid => (isValid ? null : { incorrectCredentials: true })),
          catchError(() => of({ incorrectCredentials: true }))
        );
      }
      return null;
    };
  };

  
  private checkUserCredentials(nickname: string, password: string) {
    return this.http.post<boolean>('http://localhost:8000/api', { NickName: nickname, Passwd: password }).pipe(
      map(response => !!response), 
      catchError(() => of(false)) 
    );
  }
  
}
