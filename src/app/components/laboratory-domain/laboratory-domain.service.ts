import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class LaboratoryDomainService {
  constructor(private snackbar: MatSnackBar) { }

  showMessage(msg: string): void {
    this.snackbar.open(msg, '', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
