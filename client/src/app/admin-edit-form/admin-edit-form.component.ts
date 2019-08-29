import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';

import { Product } from '../models/product.model';
import { MarketService } from '../market.service';
import { DialogErrorRegComponent } from '../dialog-error-reg/dialog-error-reg.component';
import { IDsToCategory } from '../models/ids-adding-to-categ.model';
import { ProductUpdate } from '../models/update-product.model';

@Component({
  selector: 'app-admin-edit-form',
  templateUrl: './admin-edit-form.component.html',
  styleUrls: ['./admin-edit-form.component.css']
})
export class AdminEditFormComponent implements OnInit {
  myForm : FormGroup;
  myForm2 : FormGroup;
  conditionForm: boolean =false;
  selectedImage: File=null;
  selectedImage2: File=null;
  errorFromServer: string;
  categories = [];
  
  @Output() showNewProdEmit:EventEmitter<any>=new EventEmitter<any>();
  @Input() inputProductEdit;
  @Input() inConditionForEditForm;
  
  constructor(
    private marketService: MarketService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.myForm = new FormGroup({
             
      "product": new FormControl('', [Validators.required]),
      "price": new FormControl('', [Validators.required]),
      "category": new FormControl('', [Validators.required]),
      "prodImg": new FormControl('', [Validators.required]),
    });

    this.myForm2 = new FormGroup({
             
      "product": new FormControl('', [Validators.required]),
      "price": new FormControl('', [Validators.required]),
      "category": new FormControl('', [Validators.required]),
      "prodImg": new FormControl(''),
    });

    this.marketService.getCategories().subscribe(data => {
      this.categories = data.categories;
    },
   err => 
    console.log(err)
    );
  }

  sendProductToAdminGrocery(product) {
    this.showNewProdEmit.emit(product)
  }

  openDialog() {
    this.dialog.open(DialogErrorRegComponent, {data: {message: this.errorFromServer}})
  }

  openEditForm() {
    this.inConditionForEditForm = !this.inConditionForEditForm;
    this.conditionForm = !this.conditionForm;
  }

  onFileSelected(event) {
    this.selectedImage = <File>event.target.files[0];
  }
  onFileSelected2(event) {
    this.selectedImage2 = <File>event.target.files[0];
  }

  

  saveProduct() {
    const {product, price, category} = this.myForm.value;
    const newProduct = new Product(product.toLowerCase(), price, category)
    const dataUp = new FormData();
    dataUp.append('groceryImg',this.selectedImage, this.selectedImage.name);
    dataUp.append('groceryText', JSON.stringify(newProduct));
    this.marketService.addProductToGroccery(dataUp).subscribe((data) => {
      const prodCateg = new IDsToCategory(data.category, data._id)
      this.marketService.recordToCategory(prodCateg).subscribe();
      this.sendProductToAdminGrocery(data.name);
      this.myForm.reset();
      this.conditionForm = false;
    },
    error =>  {
      console.log(error);
      this.errorFromServer = error.error;
      this.errorFromServer = (JSON.parse(error.error)).message;
      this.openDialog()
    });
  }

  editProduct() {
    const {product, price, category} = this.myForm2.value;
    const editProduct = new ProductUpdate(this.inputProductEdit._id, product, price, category)
    const dataUp = new FormData();
    dataUp.append('groceryImg',this.selectedImage2);
    dataUp.append('groceryText', JSON.stringify(editProduct));
    this.marketService.editProductInGroccery(dataUp).subscribe((data) => {
      this.sendProductToAdminGrocery(data.name);
    },
    error =>  {
      console.log(error);
      
    });
  }

  cancelEditing() {
    this.inConditionForEditForm = !this.inConditionForEditForm;
    this.conditionForm = !this.conditionForm;
    this.myForm.reset();
  }


}
