import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-data-popup',
  templateUrl: './edit-data-popup.component.html',
  styleUrls: ['./edit-data-popup.component.scss']
})
export class EditDataPopupComponent implements OnInit {
  form: FormGroup;
  errorMessage: { [key: string]: string | undefined } = {};

  constructor(
    private dialogRef: MatDialogRef<EditDataPopupComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public _data: any
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      surname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?\d{10,15}$/)]],
    });

    this.form.valueChanges.subscribe(() => {
      this.updateErrorMessages();
    });
  }

  ngOnInit() {
    this.form.patchValue({
      name: this._data.element.name,
      surname: this._data.element.surname,
      email: this._data.element.email,
      phone: this._data.element.phone
    });
  }

  private updateErrorMessages() {
    for (const field in this.form.controls) {
      if (this.form.controls.hasOwnProperty(field)) {
        this.errorMessage[field] = this.getErrorMessage(field);
      }
    }
  }

  private getErrorMessage(field: string): string | undefined {
    const control = this.form.get(field);
    if (control && control.errors) {
      if (control.errors['minlength']) {
        return 'Минимальное количество символов: 2';
      } else if (control.errors['required']) {
        return 'Это обязательное поле';
      } else if (control.errors['email']) {
        return 'Некорректный адрес';
      } else if (control.errors['pattern']) {
        return 'Некорректный номер телефона';
      }
    }
    return undefined;
  }

  saveData() {
    if (this.form.valid) {
      const formData = this.form.getRawValue();
      this.dialogRef.close(formData);
    }
  }

  closeModal() {
    this.dialogRef.close();
  }
}
