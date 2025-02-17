import { Component } from '@angular/core';
import { LogoutComponent } from "../components/logout/logout.component";

@Component({
  selector: 'app-user',
  imports: [LogoutComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

}
