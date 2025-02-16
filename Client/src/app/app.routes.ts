import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => {
          return import('./home/home.component').then((m) => m.HomeComponent);
        },
      },
      {
        path: 'dog',
        loadComponent: () => {
          return import('./dog-shop/dog-shop.component').then((m) => m.DogShopComponent);
        },
      },
      {
        path: 'cat',
        loadComponent: () => {
          return import('./cat-shop/cat-shop.component').then((m) => m.CatShopComponent);
        },
      },
      {
        path: 'account',
        loadComponent: () => {
          return import('./user/user.component').then((m) => m.UserComponent);
        },
      },
      {
        path: 'basket',
        loadComponent: () => {
          return import('./basket/basket.component').then((m) => m.BasketComponent);
        },
      },
];
