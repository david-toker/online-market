import { Component, OnInit, Input } from '@angular/core';

import { MarketService } from '../market.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {
  @Input() inputProductName;
  itemsFromCart = [];
  totalSum : number;
  constructor(
    private marketService: MarketService
  ) { }

  ngOnInit() {
    this.marketService.getProductsFromCart().subscribe(data => {
      this.totalSum = (data.allProductsInCart.map(i=>(i.price))).reduce(((acc, currentVal)=>acc+currentVal),0);
      this.itemsFromCart = data.allProductsInCart;
    },
   err => 
    console.log(err)
    );
  }

}
