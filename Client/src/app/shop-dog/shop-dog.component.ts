import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { DogProduct } from '../models/dogProduct.type';
import { DogBrand } from '../models/dogBrand.type';
import { DogCategory } from '../models/dogCategory.type';
import { HttpClient, HttpParams } from '@angular/common/http';
import { QueryParameter } from '../models/queryParameter';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatGridListModule} from '@angular/material/grid-list';
import { Observable, map } from 'rxjs';
import { Pagination } from '../models/pagination.type';

@Component({
  selector: 'app-shop-dog',
  imports: [MatPaginatorModule, MatGridListModule],
  templateUrl: './shop-dog.component.html',
  styleUrl: './shop-dog.component.scss'
})
export class ShopDogComponent implements OnInit {
  currentPage = 0;
  pageSize =3;
  products: DogProduct[] = [];
  brands: DogBrand[] = [];
  categories: DogCategory[] = [];
  sortOptions = [
    {name: 'Price: low to high', value: 'priceAsc'},
    {name: 'Price: high to low', value: 'priceDesc'}
  ]
  queryparams = new QueryParameter();

  handlePageEvent(pageEvent: PageEvent) {
    console.log('handlePageEvent', pageEvent);
    this.pageSize = pageEvent.pageSize;
    this.currentPage = pageEvent.pageIndex;
    console.log('currentPage', this.currentPage);
    console.log('pageSize', pageEvent.pageSize);
    this.getProducts(this.currentPage, this.pageSize).subscribe(
      {next:(response) => { 
        console.log('response', response);
        console.log('products', this.products);}}
      );
  }
  
  ngOnInit(): void {
    this.getProducts(this.currentPage, this.pageSize).subscribe(
      response => { 
        console.log('response', response);
        console.log('products', this.products);
    
    })
    // this.products.paginator = this.paginator;
  }

  http = inject(HttpClient);
  // pagination?: Pagination<DogProduct[]>;
  getProducts(pageIndex:number, pageSize:number):Observable<DogProduct[]> {
    let params = new HttpParams();
    params = params.append('page', pageIndex+1);
    console.log("getProduts-pageIndex", pageIndex+1)
    params = params.append('pageSize', pageSize); 
    // params = params.append('sort', this.queryparams.sortBy); 
    console.log(params)
    return this.http.get<DogProduct[]>('https://localhost:7284/api/Products', {params:params})
    .pipe(map(response => this.products=response))
  }
}

