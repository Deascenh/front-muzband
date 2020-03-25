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
import {MatSnackBar} from '@angular/material/snack-bar';
import {Music, User} from '../models';

@Injectable()
export class SavingSuccessInterceptor implements HttpInterceptor {
  private readonly GENERIC_MESSAGE = 'La sauvegarde est effectuée !';

  constructor(private snackBar: MatSnackBar) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(tap(
      (res) => this.handleSuccess(res),
    ));
  }

  private handleSuccess(res: any) {
    if (res instanceof HttpResponse && res.status === 201) {
      this.displaySuccess(res.body);
    }
  }

  /**
   * /!\ Experimental use
   * TODO Find a better way to display a related
   *  to the Entity saving success message. Because we
   *  are too early to be within the scope of class manipulation.
   */
  private displaySuccess(body: any) {
    const className = body['@type'] ? body['@type'] : null;
    let message = null;

    if (className !== null) {
      const resource = this.getResource(className, body);
      message = this.writeMessage(resource);
    }

    this.snackBar.open(message, '', {
      verticalPosition: 'top',
      duration: 3000,
      panelClass: ['saving-success-snackbar'],
    });
  }

  private getResource(className: string, body: any): any {
    let resource: any;
    switch (className) {
      case 'User':
        resource = new User(body);
        break;
      case 'Music':
        resource = new Music(body);
        break;
      default:
        resource = null;
        break;
    }
    return resource;
  }

  private writeMessage(resource: any): string {
    return typeof resource.toString === 'function'
      ? 'La sauvegarde de \"' + resource.toString() + '" est effectuée !'
      : this.GENERIC_MESSAGE;
  }
}
