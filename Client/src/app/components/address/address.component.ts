import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { LocalService } from '../../services/local.service';
import { Router } from '@angular/router';
import { Address } from '../../models/user.type';

@Component({
  selector: 'app-address',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButton],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss'
})
export class AddressComponent {
  readonly name = new FormControl('', [Validators.required]);
  readonly street = new FormControl('', [Validators.required]);
  readonly city = new FormControl('', [Validators.required]);
  readonly zipCode = new FormControl('', [Validators.required]);
  addressForm = new FormGroup({
    name: this.name,
    street:this.street,
    city: this.city,
    zipCode:this.zipCode
  });
  
  router = inject(Router);
  localservice = inject(LocalService);
  http = inject(HttpClient);
 
  onSubmit() {
    this.http.put<Address>("https://localhost:7284/api/User/address", this.addressForm.value).subscribe({
      next: () => this.router.navigateByUrl('/')
    });
  }
 
}
