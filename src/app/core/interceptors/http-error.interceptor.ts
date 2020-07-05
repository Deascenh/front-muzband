import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {IAppState} from '../store/App/App.state';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {PurgeAuth} from '../store/auth/auth.actions';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private store: Store<IAppState>) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(tap(
      () => {},
      (err: any) => this.handleErrors(err)
    ));
  }

  private handleErrors(err: any) {
    if (err instanceof HttpErrorResponse && err.status === 401) {
      this.store.dispatch(new PurgeAuth());
    }
  }
}
