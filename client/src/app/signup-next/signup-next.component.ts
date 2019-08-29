import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { MarketService } from '../market.service';
import {MatDialog} from '@angular/material/dialog';
import { Person } from '../models/person.model';
import { DialogErrorRegComponent } from '../dialog-error-reg/dialog-error-reg.component';
import { Router } from '@angular/router';

export interface City {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-signup-next',
  templateUrl: './signup-next.component.html',
  styleUrls: ['./signup-next.component.css']
})
export class SignupNextComponent implements OnInit {
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
  errorFromServer: string;
  activeUser: string = "Guest";
  myFormNext : FormGroup;

  constructor(
    private marketService: MarketService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.myFormNext = new FormGroup({
             
      "mycity": new FormControl('', [Validators.required]),
      "street": new FormControl('', [Validators.required]),
      "first": new FormControl('', [Validators.required]),
      "last": new FormControl('', [Validators.required])
    });
  }

  openDialog() {
    this.dialog.open(DialogErrorRegComponent, {data: {message: this.errorFromServer}})
  }

  getErrorStreet(){
    return this.myFormNext.get('street').hasError('required') ? 'You must enter a value' : '';
  }

  getErrorFirst(){
    return this.myFormNext.get('first').hasError('required') ? 'You must enter a value' : '';
  }

  getErrorLast(){
    return this.myFormNext.get('last').hasError('required') ? 'You must enter a value' : '';
  }

  finishRegister() {
    const {mycity, street, first, last} = this.myFormNext.value;
    const person = new Person(mycity, street, first, last);
    this.marketService.registerSecondStep(person).subscribe((person: Person) => {
      this.router.navigate(['/']);
    },
    error =>  {
      this.errorFromServer = (JSON.parse(error.error)).message;
      this.openDialog()
    });
  }
}
