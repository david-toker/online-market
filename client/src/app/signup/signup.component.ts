import { Component, OnInit } from '@angular/core';
import { MarketService } from '../market.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms'
import { User } from '../models/user.model';
import { DialogErrorRegComponent } from '../dialog-error-reg/dialog-error-reg.component';
import { LoginUser } from '../models/login.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  errorFromServer: string;
  activeUser: string = "Guest";
  myForm : FormGroup = new FormGroup({
             
    "email": new FormControl('', [Validators.required, Validators.email]),
    "idOfUser": new FormControl('', [Validators.required]),
    "pass1": new FormControl('', [Validators.required]),
    "pass2": new FormControl('', [Validators.required])
  });
  
  passwordMatchValidator(g: FormGroup) {
    return g.get('pass1').value === g.get('pass2').value
       ? null : {'mismatch': true};
 }

  hide = true;

  getErrorMail() {
    return this.myForm.get('email').hasError('required') ? 'You must enter a value' :
    this.myForm.get('email').hasError('email') ? 'Not a valid email' :
            '';
  }
  getErrorId() {
    return this.myForm.get('idOfUser').hasError('required') ? 'You must enter a value' : '';
  }

  constructor(
    private marketService: MarketService,
    private router: Router,
    public dialog: MatDialog
    ) { }

  ngOnInit() {
    
  }

  

  openDialog() {
    this.dialog.open(DialogErrorRegComponent, {data: {message: this.errorFromServer}})
  }

  onBlur() {
    this.marketService.validateId(this.myForm.get('idOfUser').value).subscribe(data => {
      this.errorFromServer=data.message
      if(this.errorFromServer==='Not Valid ID, this ID in use') {
        this.openDialog();
        this.myForm.patchValue({idOfUser: ''}) ;
      }
      
    },
   err => 
    console.log(err)
    )
  }

  

  goToNextStep() {
    const {email, idOfUser, pass1, pass2} = this.myForm.value;
    const user = new User(email, idOfUser, pass1, pass2)
    this.marketService.registerFirstStep(user).subscribe((user: User) => {
      const login = new LoginUser(email, pass1)
      this.marketService.loginToSystem(login).subscribe()
      this.router.navigate(['/signup-step2']);
    },
    error =>  {
      console.log(error);
      this.errorFromServer = (JSON.parse(error.error)).message;
      this.openDialog()
    });
  }

}
