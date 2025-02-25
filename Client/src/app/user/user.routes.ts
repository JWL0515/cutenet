import { Route } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { UserComponent } from './user.component';
import { authGuard } from '../guard/auth.guard';
import { AddressComponent } from '../components/address/address.component';

export const routes: Route[] = [
    // if logged then shows Address on ../user
    {
        path: '',
        canActivate: [authGuard],
        component: UserComponent,
    },

    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: 'address',
        component: AddressComponent,
    },
  ];