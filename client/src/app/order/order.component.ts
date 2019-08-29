import { Component, OnInit } from '@angular/core';
import { MarketService } from '../market.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  
  email: string;
  productName: string="";
  street: string;

  constructor(
    private marketService: MarketService,
    private router: Router
  ) { }

  ngOnInit() {
    this.marketService.isCartActive().subscribe(data => {
      this.email = data.user.email;
      this.street = data.user.street;
    },
   err => 
    console.log(err)
    );

  }

  findAndMarkProduct(event: Event) {
    this.productName = (<HTMLInputElement>event.target).value;
  }

  logOutUser() {
    this.marketService.logoutFromSystem().subscribe(data=>{
      this.router.navigate(['/']);
    },
    err => 
     console.log(err));

  }

}
