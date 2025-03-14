import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { DogProduct } from '../models/dogProduct.type';
import { DogBrand } from '../models/dogBrand.type';
import { DogCategory } from '../models/dogCategory.type';
import { HttpClient, HttpParams } from '@angular/common/http';
import { QueryParameter } from '../models/queryParameter';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatGridListModule} from '@angular/material/grid-list';

@Component({
  selector: 'app-shop-dog',
  imports: [MatPaginatorModule, MatGridListModule],
  templateUrl: './shop-dog.component.html',
  styleUrl: './shop-dog.component.scss'
})
export class ShopDogComponent implements OnInit {
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // products = signal<Array<DogProduct>>([])
  currentPage = 0;
  products: DogProduct[] = [];
  brands: DogBrand[] = [];
  categories: DogCategory[] = [];
  sortOptions = [
    {name: 'Price: low to high', value: 'priceAsc'},
    {name: 'Price: high to low', value: 'priceDesc'}
  ]
  queryparams = new QueryParameter();

  params = new HttpParams();

  handlePageEvent(pageEvent: PageEvent) {
    console.log('handlePageEvent', pageEvent);
    this.currentPage = pageEvent.pageIndex;
  }
  
  ngOnInit(): void {
    // this.getProducts();
    // this.products.paginator = this.paginator;
  }

  http = inject(HttpClient);

  getProducts() {
    this.params = this.params.append('page', this.queryparams.page);
    this.params = this.params.append('pageSize', 10); 
    this.params = this.params.append('sort', this.queryparams.sortBy); 
    // return this.http.get<DogProduct[]>('https://localhost:7284/api/Products').subscribe(
    //   (response) => { 
    //     console.log('response', response);
    //     this.products = response;
    //   });
    return this.http.get<DogProduct[]>('https://localhost:5000/api/Products', {params:this.params}).subscribe(
    (response) => { 
      console.log('response', response);
      this.products = response;
    });
  }
}
