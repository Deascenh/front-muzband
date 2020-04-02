import {Injectable} from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AppSnackbarService} from '../utils/app-snackbar.service';

@Injectable()
export class OperationSuccessInterceptor implements HttpInterceptor {

  constructor(private snackBar: AppSnackbarService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(tap(
      (res) => this.handleSuccess(res),
    ));
  }

  private handleSuccess(res: any) {
    if (res instanceof HttpResponse) {
      if (res.status === 201) {
        this.snackBar.displaySaveSuccess(res.body);
      }
      if (res.status === 204) {
        this.snackBar.displayDeleteSuccess();
      }
    }
  }
}
