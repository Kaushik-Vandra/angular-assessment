import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
    providedIn: 'root'
})
export class ToastrService {

    constructor(
        private _snackBar: MatSnackBar
    ) { }

    showSuccess(message: string): void {
        this._snackBar.open(message, 'Close', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 3000,
            panelClass: ['success-snackbar'],
        });
    }

    showWarning(message: string): void {
        this._snackBar.open(message, 'Close', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 3000,
            panelClass: ['warning-snackbar'],
            
        });
    }

    showError(message: string): void {
        this._snackBar.open(message, 'Close', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 3000,
            panelClass: ['error-snackbar'],
        });
    }
}