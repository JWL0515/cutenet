import { Component } from '@angular/core';
import { LogoutComponent } from '../components/logout/logout.component';
import { AddressComponent } from "../components/address/address.component";

@Component({
  selector: 'app-user',
  imports: [LogoutComponent, AddressComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

}
