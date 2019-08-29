import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { Router } from '@angular/router';

import { MarketService } from '../market.service';
import { DialogErrorRegComponent } from '../dialog-error-reg/dialog-error-reg.component';
import { Order } from '../models/order.model';
import { DialogSuccesBuyingComponent } from '../dialog-succes-buying/dialog-succes-buying.component';


export interface City {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  cities: City[] = [
    {value: 'kfar-saba', viewValue: 'Kfar Saba'},
    {value: 'tel-aviv', viewValue: 'Tel Aviv'},
    {value: 'jerusalem', viewValue: 'Jerusalem'},
    {value: 'raanana', viewValue: 'Raanana'},
    {value: 'ashdod', viewValue: 'Ashdod'},
    {value: 'ashkelon', viewValue: 'Ashkelon'},
    {value: 'haifa', viewValue: 'Haifa'},
    {value: 'rehovot', viewValue: 'Rehovot'},
    {value: 'ramat-gan', viewValue: 'Ramat Gan'},
    {value: 'hod-hasharon', viewValue: 'Hod HaSharon'},
  ];

  allDatesDisShipping = [];
  dateArr = [];
  errorFromServer: string;
  totalPrice: number;
  itemsFromCart: [];
  minDate = new Date(Date.now());
  
 
  
  myForm : FormGroup;
  @Input() inputStreet;
  constructor(
    private marketService: MarketService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.marketService.getShippingDates().subscribe(data => {
      for (const key in data.allShippingDate) {
        if (data.allShippingDate[key]===3) {
          this.allDatesDisShipping.push(key);
          
        }
      }
      this.dateArr = this.allDatesDisShipping.map(d=>d);
    },
    error => console.log(error));

    this.marketService.getProductsFromCart().subscribe(data => {
      this.totalPrice = (data.allProductsInCart.map(i=>(i.price))).reduce(((acc, currentVal)=>acc+currentVal),0);
      this.itemsFromCart = data.allProductsInCart;
    },
   err => 
    console.log(err)
    );
  

    this.myForm = new FormGroup({
             
      "mycity": new FormControl('', [Validators.required]),
      "street": new FormControl('', [Validators.required]),
      "shippingdate": new FormControl('', [Validators.required]),
      "credit": new FormControl('', [Validators.required])
    });
  }

  openDialog() {
    this.dialog.open(DialogErrorRegComponent, {data: {message: this.errorFromServer}})
  }


  getErrorStreet(){
    return this.myForm.get('street').hasError('required') ? 'You must enter a value' : '';
  }


  getErrorCredit(){
    return this.myForm.get('credit').hasError('required') ? 'You must enter a value' : '';
  }

  getErrorDate(){
    return this.myForm.get('shippingdate').hasError('required') ? 'You must enter a value' : '';
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    let dm = (this.dateArr.filter(d=>(new Date(d)).getMonth()===(event.value.getMonth())&& (new Date(d)).getDate()===(event.value.getDate())));
    if (dm.length) {
     this.errorFromServer = 'We are sorry, but we have no delivery on this day';
     this.openDialog();
     this.myForm.patchValue({shippingdate: ''}) ;
    }
  }

  clearCart() {
    this.marketService.disactivateCart().subscribe(data => {
    },
    error =>  {
      console.log(error);
    });
  }

  openDialogSuccess() {
    const dialogRef = this.dialog.open(DialogSuccesBuyingComponent, {data: {items: this.itemsFromCart}});

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/']);
    });
  }
  
  orderAndPay() {
    const {mycity, street, shippingdate, credit} = this.myForm.value;
    const order = new Order(this.totalPrice, mycity, street, shippingdate, credit);

    this.marketService.purchaseProducts(order).subscribe((order: Order) => {
      this.clearCart();
      this.openDialogSuccess();
    },
    error =>  {
      console.log(error);
      this.errorFromServer = ((JSON.parse(error.error)).errors.paymentMethod.message);
      this.openDialog()
    });
  }

  insertStreet() {
    this.myForm.patchValue({street: this.inputStreet}) ;
  }
  

}
