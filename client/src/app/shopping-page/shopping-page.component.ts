import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';

import { MarketService } from '../market.service';
import { DialogAdditemComponent } from '../dialog-additem/dialog-additem.component';
import { Item } from '../models/item.model';
import { IncItem } from '../models/inc-item.model';


@Component({
  selector: 'app-shopping-page',
  templateUrl: './shopping-page.component.html',
  styleUrls: ['./shopping-page.component.css']
})
export class ShoppingPageComponent implements OnDestroy, OnInit {
  mobileQuery: MediaQueryList;
  itemsFromCart = [];
  totalSum : number;
  email: string;
  categories = [];
  selectedCategory = [];
  quantity: number;
  itemIdToIncProduct: string;
  productName: string;

  private _mobileQueryListener: () => void;

  constructor(
    private router: Router,
    private marketService: MarketService,
    public dialog: MatDialog,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
    ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  productsFromCart() {
    this.marketService.getProductsFromCart().subscribe(data => {
      this.totalSum = (data.allProductsInCart.map(i=>(i.price))).reduce(((acc, currentVal)=>acc+currentVal),0);
      this.itemsFromCart = data.allProductsInCart;
    },
   err => 
    console.log(err)
    );
  }

  ngOnInit() {
    this.marketService.isCartActive().subscribe(data => {
      this.email = data.user.email
      if (data.cart) {
        this.productsFromCart();
      } else {
        this.marketService.createNewCart().subscribe(data => {
          this.productsFromCart();
        },
        error => console.log(error))
      }
    },
   err => 
    console.log(err)
    );

    this.marketService.getCategories().subscribe(data => {
      this.categories = data.categories;
      this.getProducts(this.categories[0]._id);
    },
   err => 
    console.log(err)
    );

    
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  getProducts(id) {
    this.marketService.getSpecificCategory(id).subscribe(data => {
      this.selectedCategory = data.category.products;
    },
   err => 
    console.log(err)
    );
  }

  openDialog(id, price) {
    const dialogRef = this.dialog.open(DialogAdditemComponent, {data: {quantity: this.quantity}});

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.quantity = result;
        const item = new Item(id, this.quantity, price)
        this.marketService.addProductToCart(item).subscribe((item: Item) => {
          this.productsFromCart();
        },
        error => console.log(error))
      }
      
    });
  }

  openDialogToIncProducts(id, price) {
    const dialogRef = this.dialog.open(DialogAdditemComponent, {data: {quantity: this.quantity}});

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.quantity = result;
        const item = new IncItem(id, this.quantity, price)
        this.marketService.incProductsInCart(item).subscribe((item: IncItem) => {
          this.productsFromCart();
        },
        error => console.log(error))
      }
      
    });
  }

  addProduct(id:string, price) {
    
    if(!(this.itemsFromCart.map(i=>({id: i.product._id}))).some(i=>i.id===id)) {
      // if product is not in cart
      this.openDialog(id, price);
    }
    else{
      // product is in cart, must to increment
      this.itemIdToIncProduct = (this.itemsFromCart.map(i=>({itemId: i._id, productId: i.product._id}))).filter(i=>i.productId===id)[0].itemId;
      this.openDialogToIncProducts(this.itemIdToIncProduct, price)
    }
  }

  removeItem(id) {
    this.marketService.removeItemFromCart(id).subscribe();
    this.productsFromCart();
  }


  removeAllItems() {
    this.marketService.removeAllItemsFromCart().subscribe();
    this.productsFromCart();
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
  } else {
    this.getProducts(this.categories[0]._id)
  }
  }

  logOutUser() {
    this.marketService.logoutFromSystem().subscribe(data=>{
      this.router.navigate(['/']);
    },
    err => 
     console.log(err));

  }

  goToOrder() {
    this.router.navigate(['/order-page']);
  }

}
