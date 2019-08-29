import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MarketService } from '../market.service';


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  productName: string;
  selectedCategory = [];
  activeAdmin: string = "Guest";
  productForEdit;
  conditionForEditForm: boolean;
  constructor(
    private marketService: MarketService,
    private router: Router
  ) { }

  ngOnInit() {
    this.marketService.adminName().subscribe(data=>{
      this.activeAdmin = data.first
    },
    err => 
     console.log(err))
  }

  findProduct() {
    if (this.productName) {
      this.marketService.getOneProduct(this.productName).subscribe(data => {
        this.selectedCategory = [];
        this.selectedCategory.push(data.product);
        this.productName = '';
      },
     err => 
      console.log(err)
      );
    }
  }

  searchNewProduct(product) {
    this.marketService.getOneProduct(product).subscribe(data => {
      this.selectedCategory = [];
      this.selectedCategory.push(data.product);
      this.productName = '';
    },
   err => 
    console.log(err)
    );
  }

  editProduct(product) {
    this.productForEdit = product;
    this.conditionForEditForm = true;
  }

  logOutUser() {
    this.marketService.logoutFromSystem().subscribe(data=>{
      this.router.navigate(['/']);
    },
    err => 
     console.log(err));

  }

}
