import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-error-reg',
  templateUrl: './dialog-error-reg.component.html',
  styleUrls: ['./dialog-error-reg.component.css']
})
export class DialogErrorRegComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
