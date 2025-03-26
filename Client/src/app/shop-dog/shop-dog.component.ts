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
    {name: 'Price: low to high', value: 'priceAsc'},
    {name: 'Price: high to low', value: 'priceDesc'}
  ]

  shopService = inject(ShopService);

  queryparams: QueryParameter;
  constructor() {
    this.queryparams = this.shopService.getShopParams();
  }

  handlePageEvent(pageEvent: PageEvent) {
    console.log("event", pageEvent);
    const params = this.shopService.getShopParams();
    console.log("params.page", params.page);
    console.log("pageEvent.pageIndex", pageEvent.pageIndex);
    params.page = pageEvent.pageIndex + 1;
    this.shopService.setShopParams(params);
    this.queryparams = params;
    this.getProducts();
  }
  
  ngOnInit(): void {
    console.log("ngOnInit page", this.queryparams.page);
    console.log("ngOnInit pageSize", this.queryparams.pageSize);
    this.getProducts();
    this.getbrands();
    this.getCategories();
  }

  getProducts() {
    this.shopService.getProducts().subscribe(
      {next:(response:DogProduct[]) => this.products = response}
      );
  }

  onSortSelected(event: any) {
    // const params = this.shopService.getShopParams();
    // params.sort = event.target.value;
    // this.shopService.setShopParams(params);
    // this.shopParams = params;
    // this.getProducts();
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

  onBrandSelected(brandId: number) {
    // let params = new HttpParams();
    // params.brandId = brandId;
    // params.pageNumber = 1;
    // this.shopService.setShopParams(params);
    // this.shopParams = params;
    // this.getProducts();
  }
}

