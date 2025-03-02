import { Component, inject } from '@angular/core';
import { LocalService } from '../../services/local.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-logout',
  imports: [MatButtonModule],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {
  localService = inject(LocalService);
  router = inject(Router);
  authService = inject(AuthService);
  logout(){
    this.localService.clearData();
    this.authService.currentUserSig.set(null);
    this.router.navigateByUrl("");
  }
}
