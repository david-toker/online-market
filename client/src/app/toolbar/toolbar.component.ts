import { Component, OnInit, Input } from '@angular/core';
import { MarketService } from '../market.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Input()  inputUserToolbar;
  
  constructor(
    private marketService: MarketService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logOutUser() {
    this.marketService.logoutFromSystem().subscribe(data=>{
      this.router.navigate(['/']);
    },
    err => 
     console.log(err));

  }
}
