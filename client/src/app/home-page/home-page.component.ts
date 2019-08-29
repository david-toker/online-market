import { Component, OnInit } from '@angular/core';

import { MarketService } from '../market.service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  activeUser: string = "Guest";
  dateOfCart: Date;
  isLogin: boolean = false;
  isActive: boolean = false;
  dateOfLastPurchase: Date;
  totalSum : number;
  
  constructor(private marketService: MarketService) { }

  getDateOfLastPurchase() {
    this.marketService.getLastPurchase().subscribe(data => {
      if (data.order) {
        this.dateOfLastPurchase = data.order.orderDate;
      }
    },
   err => 
    console.log(err)
    );
  }

  productsFromCart() {
    this.marketService.getProductsFromCart().subscribe(data => {
      this.totalSum = (data.allProductsInCart.map(i=>(i.price))).reduce(((acc, currentVal)=>acc+currentVal),0);
    },
   err => 
    console.log(err)
    );
  }
  ngOnInit() {
    this.marketService.isCartActive().subscribe(data => {
      if (data) {
        this.getDateOfLastPurchase();
        this.isLogin = true;
        this.activeUser = data.user.first;
        if (data.cart) {
          this.dateOfCart = data.cart.createdDate;
          this.isActive = true;
          this.productsFromCart();
        }
        if (data.user.role) {
          this.isLogin = false;
        }
      }
    },
   err => 
    console.log(err)
    );
  }

}
