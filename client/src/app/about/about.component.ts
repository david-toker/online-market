import { Component, OnInit, Input } from '@angular/core';
import { MarketService } from '../market.service';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  products: number;
  orders: number;
  constructor( private marketService: MarketService) { }

  @Input() inputUser;
  @Input() inputCondition;
  @Input() inputLastCartDate;
  @Input() inputDateOfLastPurchase;
  @Input() inputTotalSum: number;

  ngOnInit() {
    this.marketService.countProducts().subscribe(data => {
      this.products = data.numOfProducts;
    },
   err => 
    console.log(err)
    );

    
    this.marketService.countOrders().subscribe(data => {
      this.orders = data.numOfOrders;
    },
   err => 
    console.log(err)
    );
    


  }

}
