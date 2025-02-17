import { Component } from '@angular/core';
import { LoginComponent } from '../components/login/login.component';
import { AddressComponent } from "../components/address/address.component";

@Component({
  selector: 'app-user',
  imports: [LoginComponent, AddressComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

}
