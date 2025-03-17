import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DogProduct } from '../models/dogProduct.type';
import { Pagination } from '../models/pagination.type';
import { QueryParameter } from '../models/queryParameter';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  currentPage = 1;
  pageSize = 2;
  pagination?: Pagination<DogProduct[]>;
  page: any;
  constructor() { }
  http = inject(HttpClient);
  params = new HttpParams();
  queryparams = new QueryParameter();
  
  getProducts(): Observable<Pagination<DogProduct[]>> {
      this.params = this.params.append('page', this.queryparams.page);
      this.params = this.params.append('pageSize', this.queryparams.pageSize); 
      this.params = this.params.append('sort', this.queryparams.sortBy); 
      return this.http.get<Pagination<DogProduct[]>>('https://localhost:7284/api/Products', {params:this.params})
      .pipe(map((response) => (this.pagination = response))); 
    }

  getShopParams() {
    return this.queryparams;
  }
}
