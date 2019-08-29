import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';

import { MarketService } from '../market.service';
import { LoginUser } from '../models/login.model';
import { DialogErrorRegComponent } from '../dialog-error-reg/dialog-error-reg.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorFromServer: string;
  myForm : FormGroup;
  userObj: any;
  hide = true;
  constructor(
    private marketService: MarketService,
    private router: Router,
    public dialog: MatDialog
    ) { }

  @Input() inputConditionLog: boolean;  
  @Input() inIsActive: boolean;  
  ngOnInit() {
    this.myForm = new FormGroup({
             
      "username": new FormControl('', [Validators.required]),
      "pass": new FormControl('', [Validators.required])
    });
  }

  openDialog() {
    this.dialog.open(DialogErrorRegComponent, {data: {message: this.errorFromServer}})
  }


  getErrorUser(){
    return this.myForm.get('username').hasError('required') ? 'You must enter a value' : '';
  }
  getErrorPass(){
    return this.myForm.get('pass').hasError('required') ? 'You must enter a value' : '';
  }

  resumeShopping() {
    this.router.navigate(['/shopping']);
  }

  loginWithEmail() {
    const {username, pass} = this.myForm.value;
    const user = new LoginUser(username, pass)
    this.marketService.loginToSystem(user).subscribe((user: LoginUser) => {
      this.userObj = user;
      if (JSON.parse(this.userObj).role) {
        this.router.navigate(['/admin-page']);
      }else {
        this.router.navigate(['/shopping']);
      }
      
    },
    error =>  {
      this.errorFromServer = error.error;
      this.openDialog()
    });
  }

}
