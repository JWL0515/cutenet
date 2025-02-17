import { Component, inject } from '@angular/core';
import { LocalService } from '../../services/local.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-logout',
  imports: [MatButtonModule],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {
  localservice = inject(LocalService);
  router = inject(Router);
  logout(){
    this.localservice.clearData();
    this.router.navigateByUrl("");
  }
}
