import { Injectable, Injector, ErrorHandler } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

/** Passes HttpErrorResponse to application-wide error handler */
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private injector: Injector, 
    private snackBar: MatSnackBar
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(null, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          console.warn( err );
          if (err.status !== 0) {
            const appErrorHandler = this.injector.get(ErrorHandler);
            this.snackBar.open(err.message,'', { duration: 2000 });
          }
        }
      })
    );
  }
}
