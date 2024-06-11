import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-data-popup',
  templateUrl: './delete-data-popup.component.html',
  styleUrls: ['./delete-data-popup.component.scss']
})
export class DeleteDataPopupComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteDataPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onDelete(): void {
    this.dialogRef.close(true);  
  }

  onCancel(): void {
    this.dialogRef.close(false);  
  }

}
