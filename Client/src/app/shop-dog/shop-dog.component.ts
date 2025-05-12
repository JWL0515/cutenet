import { Component, Inject, inject, OnInit, signal, ViewChild } from '@angular/core';
import { DogProduct } from '../models/dogProduct.type';
import { DogBrand } from '../models/dogBrand.type';
import { DogCategory } from '../models/dogCategory.type';
import { HttpClient, HttpParams } from '@angular/common/http';
import { QueryParameter } from '../models/queryParameter';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatGridListModule} from '@angular/material/grid-list';
import { Observable, map } from 'rxjs';
import { Pagination } from '../models/pagination.type';
import { ShopService } from '../services/shop.service';
import { response } from 'express';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-shop-dog',
  imports: [MatPaginatorModule, MatGridListModule],
  templateUrl: './shop-dog.component.html',
  styleUrl: './shop-dog.component.scss'
})
export class ShopDogComponent implements OnInit {
  products: DogProduct[] = [];
  brands: DogBrand[] = [];
  categories: DogCategory[] = [];
  sortOptions = [
    {name: 'Alphabetical', value: 'Name'},
    {name: 'Price: low to high', value: 'asc'},
    {name: 'Price: high to low', value: 'desc'}
  ]
  
  itemCount = 0;

  shopService = inject(ShopService);
  queryparams: QueryParameter;

  constructor() {
    this.queryparams = this.shopService.getShopParams();
  }

  handlePageEvent(pageEvent: PageEvent) {
    const params = this.shopService.getShopParams();
    // if pageSize changed, reload size with changed pageSize; otherweis the pruduct-page will changed with params.page  
    if (params.pageSize != pageEvent.pageSize){
      params.page = 1;
      params.pageSize = pageEvent.pageSize;
      this.shopService.setShopParams(params);
      this.queryparams = params;
      this.getProducts();
    }
    else {
      params.page = pageEvent.pageIndex + 1;
      this.shopService.setShopParams(params);
      this.queryparams = params;
      this.getProducts();
    }
  }
  
  ngOnInit(): void {
    this.getProducts();
    this.getbrands();
    this.getCategories();
    
  }

  getProducts() {
    this.shopService.getProducts().subscribe(
      {next:(response) =>{this.itemCount=response.itemCount; this.products = response.products}}
      );
  }

  onSortSelected(event: any) {
    const params = this.shopService.getShopParams();
    params.sortBy = event.target.value;
    console.log('event.target.value',event.target.value)
    this.shopService.setShopParams(params);
    this.queryparams = params;
    this.getProducts();
  }
  
  getbrands() {
    this.shopService.getbrands().subscribe(
      {next:(response:DogBrand[]) => this.brands = response}
      );
  }

  getCategories() {
    this.shopService.getCategories().subscribe(
      {next:(response:DogCategory[]) => this.categories = response}
      );
  }

  onBrandSelected(brand: string) {
    // doesn't matter when choose a brand, the  only the brand should be changed and page should be the first page
    const params = this.shopService.getShopParams();
    params.brand = brand;
    params.page = 1;
    this.shopService.setShopParams(params);
    this.queryparams = params;
    this.getProducts();
  }

  onCategorySelected(category: string) {
    // doesn't matter when choose a category, the  only the category should be changed and page should be the first page
    const params = this.shopService.getShopParams();
    params.category = category;
    params.page = 1;
    this.shopService.setShopParams(params);
    this.queryparams = params;
    this.getProducts();
  }

  onReset(){
    this.queryparams = new QueryParameter();
    this.shopService.setShopParams(this.queryparams);
    this.getProducts();
  }
}

