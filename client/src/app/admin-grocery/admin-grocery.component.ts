import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


import { MarketService } from '../market.service';

@Component({
  selector: 'app-admin-grocery',
  templateUrl: './admin-grocery.component.html',
  styleUrls: ['./admin-grocery.component.css']
})
export class AdminGroceryComponent implements OnInit {
  @Input() inputCategory: any;
  @Output() editProductEmit:EventEmitter<any>=new EventEmitter<any>();

  categories = [];
  selectedCategory = [];
  constructor(
    private marketService: MarketService
  ) { }

  ngOnInit() {
    this.marketService.getCategories().subscribe(data => {
      this.categories = data.categories;
      this.getProducts(this.categories[0]._id)
    },
   err => 
    console.log(err)
    );
  }



  getProducts(id) {
    this.inputCategory.length = 0;
    this.marketService.getSpecificCategory(id).subscribe(data => {
      this.selectedCategory = data.category.products;
    },
   err => 
    console.log(err)
    );
  }

  editProduct(product) {
    this.editProductEmit.emit(product)
  }


}
