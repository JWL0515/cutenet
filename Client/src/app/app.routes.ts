import { Routes } from '@angular/router';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'dog',
        loadComponent: () => import('./shop-dog/shop-dog.component').then((m) => m.ShopDogComponent),
      },
      {
        path: 'cat',
        loadComponent: () => import('./shop-cat/shop-cat.component').then((m) => m.ShopCatComponent),
      },
      {
        path: 'user',
       /*  canActivate: [authGuard], */
        loadChildren: () => import('./user/user.routes').then((m) => m.routes),
      },
      {
        path: 'basket',
        loadComponent: () => import('./basket/basket.component').then((m) => m.BasketComponent),
      },
];
