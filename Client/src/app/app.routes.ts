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
          return import('./components/dog-shop/dog-shop.component').then((m) => m.DogShopComponent);
        },
      },
      {
        path: 'cat',
        loadComponent: () => {
          return import('./components/cat-shop/cat-shop.component').then((m) => m.CatShopComponent);
        },
      },
      {
        path: 'account',
        loadComponent: () => {
          return import('./components/account/account.component').then((m) => m.AccountComponent);
        },
      },
      {
        path: 'basket',
        loadComponent: () => {
          return import('./components/basket/basket.component').then((m) => m.BasketComponent);
        },
      },
];
