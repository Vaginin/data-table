import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-data-popup',
  templateUrl: './add-data-popup.component.html',
  styleUrls: ['./add-data-popup.component.scss']
})
export class AddDataPopupComponent {
  form: FormGroup;
  errorMessage: { [key: string]: string | undefined } = {};

  constructor(
    private dialogRef: MatDialogRef<AddDataPopupComponent>,
    private fb: FormBuilder,
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

  createData() {
    if (this.form.valid) {
      const formData = this.form.getRawValue();
      this.dialogRef.close(formData);
    }
  }

  closeModal() {
    this.dialogRef.close();
  }
}
