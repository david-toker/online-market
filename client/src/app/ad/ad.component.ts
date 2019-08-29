import { Component, OnInit } from '@angular/core';
import { MarketService } from '../market.service';

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.css']
})
export class AdComponent implements OnInit {
  slides = []
  constructor( private marketService: MarketService) { }

  ngOnInit() {
    this.marketService.getProducts().subscribe(data => {
      this.slides = data.products.map(p=>({price: p.price, image: p.imagePath})).slice(0, 1);
    },
   err => 
    console.log(err)
    )
  }

}
