import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { throwError, catchError } from 'rxjs';
import { User } from '../../models/user.type';
import { Router } from 'express';
import { LocalService } from '../../services/local.service';

@Component({
  selector: 'app-address',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss'
})
export class AddressComponent {
    readonly name = new FormControl('', [Validators.required]);
    readonly street = new FormControl('', [Validators.required]);
    readonly city = new FormControl('', [Validators.required]);
    readonly zipCode = new FormControl('', [Validators.required]);
    addressForm = new FormGroup({
      email: this.name,
      password:this.street,
      city: this.city,
      zipCode:this.zipCode
  });

    router = inject(Router);
    localservice = inject(LocalService);
    http = inject(HttpClient);
    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong.
          console.error(
            `Backend returned code ${error.status}, body was: `, error.error);
        }
        // Return an observable with a user-facing error message.
        return throwError(() => new Error('Something bad happened; please try again later.'));
      }
    onSubmit() {
        this.http.post<User>("https://localhost:7284/api/User/Address", this.addressForm.value).pipe(
          catchError(this.handleError) // then handle the error
        ).subscribe();
        this.router.navigateByUrl("");
        // this.localservice.saveData("userName", "xxxxx")
      }
}
