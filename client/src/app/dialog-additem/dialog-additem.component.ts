import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-additem',
  templateUrl: './dialog-additem.component.html',
  styleUrls: ['./dialog-additem.component.css']
})
export class DialogAdditemComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogAdditemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
