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
        loadComponent: () => import('./dog-shop/dog-shop.component').then((m) => m.DogShopComponent),
      },
      {
        path: 'cat',
        loadComponent: () => import('./cat-shop/cat-shop.component').then((m) => m.CatShopComponent),
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
