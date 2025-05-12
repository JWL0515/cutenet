import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { DogProduct } from '../../models/dogProduct.type';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from '../../services/basket.service';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-product-details',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  product!: DogProduct;
  quantity = 1;
  quantityInBasket = 0;

  http = inject(HttpClient);
  activatedRoute = inject(ActivatedRoute)
  basketService = inject(BasketService)

  ngOnInit(): void {
    this.loadProduct();
  }
  
  loadProduct() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.http.get<DogProduct>('https://localhost:7284/api/Products/' + id).subscribe({next:(response) =>{this.product=response}});
  }

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    this.quantity--;
  }

  addToBasket() {
    // const itemsToAdd = this.quantity - this.quantityInBasket;
    // this.quantityInBasket += itemsToAdd;
    // this.basketService.addItemToBasket(this.product, itemsToAdd);
    // if (this.isProduct(item)) item = this.mapProductItemToBasketItem(item);
    // const basket = this.getCurrentBasketValue() ?? this.createBasket();
    // basket.items = this.addOrUpdateItem(basket.items, item, quantity);
    // this.setBasket(basket);
  }
}
