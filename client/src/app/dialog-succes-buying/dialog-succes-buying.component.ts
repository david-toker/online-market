import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as jsPDF from 'jspdf';


import { MarketService } from '../market.service';


@Component({
  selector: 'app-dialog-succes-buying',
  templateUrl: './dialog-succes-buying.component.html',
  styleUrls: ['./dialog-succes-buying.component.css']
})
export class DialogSuccesBuyingComponent implements OnInit {
  price: number;
  first: string;
  last: string;
  city: string;
  street: string;
  paymentMethod: string;
  orderDate: string;
  allProducts =[];
  constructor(
    private marketService: MarketService,
    private router: Router,
    public dialogRef: MatDialogRef<DialogSuccesBuyingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit() {
    this.allProducts = (this.data.items.map(i=>({product: i.product.name, price: i.price})))
    
    this.marketService.getLastPurchase().subscribe(data => {
      this.price = data.order.price;
      this.first = data.order.user.first;
      this.last = data.order.user.last;
      this.city = data.order.city;
      this.street = data.order.street;
      this.paymentMethod = data.order.paymentMethod;
      this.orderDate = data.order.orderDate;
    },
   err => 
    console.log(err)
    );
  }

  finishShopping(): void {
    this.router.navigate(['/']);
    this.dialogRef.close();
  }

  downloadPDF() {
  let doc = new jsPDF();
  doc.setFontSize(22);
  doc.text('Online Market', 105, 20, null, null, 'center');
  doc.setFontSize(16);
  doc.text(`Date: ${(new Date(this.orderDate)).toUTCString()}`, 10, 30);
  doc.text(`${this.last} ${this.first}`, 10, 40);
  doc.text(`${this.city}, ${this.street}`, 10, 50);
  doc.text(`You order ${this.allProducts.length} items`, 10, 60);

  doc.setLineWidth(0.1)
  doc.setDrawColor(0, 0, 0);
  doc.setLineDash([2.5])
  doc.line(10, 80, 200, 80);

  for(let i=0; i<this.allProducts.length; i++) {
    doc.text(`${this.allProducts[i].product} - ${this.allProducts[i].price}`, 10, 90+(i+1)*10);
  }
  doc.text(`Total sum: ${this.price}`, 10, ((this.allProducts.length*10)+100));
  doc.text(`payment meyhod: ${this.paymentMethod}`, 10, ((this.allProducts.length*10)+110));
  doc.save('bill.pdf');
  }

}
