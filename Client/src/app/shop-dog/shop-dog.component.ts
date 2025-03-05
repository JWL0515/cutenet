import { Component, inject } from '@angular/core';
import { DogProduct } from '../models/dogProduct.type';
import { DogBrand } from '../models/dogBrand.type';
import { DogCategory } from '../models/dogCategory.type';
import { HttpClient, HttpParams } from '@angular/common/http';
import { QueryParameter } from '../models/queryParameter';
import { response } from 'express';

@Component({
  selector: 'app-shop-dog',
  imports: [],
  templateUrl: './shop-dog.component.html',
  styleUrl: './shop-dog.component.scss'
})
export class ShopDogComponent {
  products: DogProduct[] = [];
  brands: DogBrand[] = [];
  categories: DogCategory[] = [];
  sortOptions = [
    {name: 'Price: low to high', value: 'priceAsc'},
    {name: 'Price: high to low', value: 'priceDesc'}
  ]
  queryparams = new QueryParameter();

  params = new HttpParams();
  
  ngOnInit(): void {
    this.getProducts();
  }

  http = inject(HttpClient);

  getProducts() {
    this.params = this.params.append('page', 2);
    this.params = this.params.append('pageSize', this.queryparams.pageSize); 
    this.params = this.params.append('sort', this.queryparams.sortBy); 
    return this.http.get<DogProduct[]>('https://localhost:7284/api/Products', {params:this.params}).subscribe(
      (response) => { 
        console.log('response', response);
        this.products = response;
      });
    // return this.http.get<DogProduct[]>('https://localhost:7284/api/Products', {params:this.params}).subscribe(
    // (response) => { 
    //   console.log('response', response);
    //   this.products = response;
    // });
  }
}
