import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { DogProduct } from '../models/dogProduct.type';
import { Pagination } from '../models/pagination.type';
import { QueryParameter } from '../models/queryParameter';
import { DogBrand } from '../models/dogBrand.type';
import { DogCategory } from '../models/dogCategory.type';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  http = inject(HttpClient);
  queryparams = new QueryParameter();
  itemCount = 0;

  getProducts(): Observable<Pagination<DogProduct[]>> {
    let params = new HttpParams();
    if (this.queryparams.brand !== '') params = params.append('brand', this.queryparams.brand);
    if (this.queryparams.category !== '') params = params.append('category', this.queryparams.category);
    params = params.append('page', this.queryparams.page);
    params = params.append('pageSize', this.queryparams.pageSize); 
    // params = params.append('sort', this.queryparams.sortBy);

    return this.http.get<Pagination<DogProduct[]>>('https://localhost:7284/api/Products', {params:params})
    }

  setShopParams(queryParams: QueryParameter) {
    this.queryparams = queryParams;
  }

  getShopParams() {
    return this.queryparams;
  }

  getbrands():Observable<DogBrand[]> {
    return this.http.get<DogBrand[]>('https://localhost:7284/api/Products/brands');
  }

  getCategories():Observable<DogCategory[]> {
      return this.http.get<DogCategory[]>('https://localhost:7284/api/Products/categories');
    }
  
}
