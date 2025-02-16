import { Component } from '@angular/core';
import { LoginComponent } from '../components/login/login.component';

@Component({
  selector: 'app-user',
  imports: [LoginComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

}
