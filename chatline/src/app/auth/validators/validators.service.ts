import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ValidatorService {
  //validation for 6 char long passwd
  public passwordValidator = (control: FormControl): ValidationErrors | null => {
    const value: string = control.value || '';
    if (value.length < 6) {
      return { minLength: true }; // Error dont long enough
    }
    return null; // No errors
  };
}
