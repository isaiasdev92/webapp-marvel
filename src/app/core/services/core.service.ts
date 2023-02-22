import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoreMarvelService {

  constructor(private snackbar: MatSnackBar,) { }


  handleError = (error: HttpErrorResponse) => {
    console.log("ERROR ==>", error);
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Throw it so that it can be handled by the global application error handler.
      throw error;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      this.snackbar.open('Something bad happened; please try again later.', 'Close');
    }
    // return an ErrorObservable with a user-facing error message
    return throwError(() => error);
  };

}
