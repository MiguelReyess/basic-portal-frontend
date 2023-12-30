import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  mostrarSnackbar(mensaje: string): void {
    const config = new MatSnackBarConfig();
    config.duration = 2000;
    config.horizontalPosition = 'end';
    config.verticalPosition = 'top'; 
    this.snackBar.open(mensaje, 'Cerrar', config);
  }
}
