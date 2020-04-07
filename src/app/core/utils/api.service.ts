import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {catchError} from 'rxjs/operators';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import {SimpleSnackBar} from '@angular/material/snack-bar/typings/simple-snack-bar';
import {Router} from '@angular/router';

export interface HttpOptions {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  params?: HttpParams | {
    [param: string]: string | string[];
  };
  body?: any;
  responseType?: any;
  reportProgress?: boolean;
  withCredentials?: boolean;
}

@Injectable()
export class ApiService {
  private errorShown: MatSnackBarRef<SimpleSnackBar> = null;

  private httpOptions: HttpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      Accept: 'application/json, application/ld+json',
    }),
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  private static makePath(path: string): string {
    return environment.paired_api_base_url + path.replace(/\/api\//, '');
  }

  private static getErrorMessageToShowOrNull(error: any): string | null {
    let message = null;

    if (error.status >= 500 || error.status === 0) {
      message = 'Erreur serveur';
    } else if (error.status === 404) {
      message = 'Ressource introuvable';
    }

    return message;
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    this.httpOptions.params = params;

    return this.http.get(
      ApiService.makePath(path),
      this.httpOptions,
    ).pipe(catchError(this.handleErrors.bind(this)));
  }

  put(path: string, body: object = {}): Observable<any> {
    return this.http.put(
      ApiService.makePath(path),
      JSON.stringify(body),
      this.httpOptions,
    ).pipe(catchError(this.handleErrors.bind(this)));
  }

  post(path: string, body: object = {}): Observable<any> {
    return this.http.post(
      ApiService.makePath(path),
      JSON.stringify(body),
      this.httpOptions,
    ).pipe(catchError(this.handleErrors.bind(this)));
  }

  download(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    this.httpOptions.params = params;
    this.httpOptions.responseType = 'blob';

    return this.http.get(
      ApiService.makePath(path),
      this.httpOptions,
    ).pipe(catchError(this.handleErrors.bind(this)));
  }

  upload(path: string, body: object = {}, params: HttpParams = new HttpParams()): Observable<any> {
    this.httpOptions.params = params;
    this.httpOptions.reportProgress = true;

    return this.http.post(
      ApiService.makePath(path),
      body,
      this.httpOptions,
    ).pipe(catchError(this.handleErrors.bind(this)));
  }

  /**
   * Safe delete with body
   * @param { string } path
   * @param { Object } body
   */
  delete(path: string, body: object = {}): Observable<any> {
    return this.http.request(
      'delete',
      ApiService.makePath(path),
      { body },
    ).pipe(catchError(this.handleErrors.bind(this)));
  }

  /**
   * This function Handles an error received from the server and caught,
   * it describes it in the DOM then throws a native error
   *
   * @param { any } error
   */
  private handleErrors(error: any) {
    const messageToShow = ApiService.getErrorMessageToShowOrNull(error);

    if (this.errorShown === null && messageToShow !== null) {
      if (error.status === 404) {
        this.router.navigateByUrl('/content-not-found-404');
      }
      this.showError(messageToShow)
        .afterDismissed()
        .subscribe(() => this.errorShown = null);
    }

    return throwError(environment.production ? null : error);
  }

  /**
   * Show to the user the error message within a Material Snackbar
   *
   * @param { string } message
   * @return { MatSnackBarRef<SimpleSnackBar> }
   */
  private showError(message: string): MatSnackBarRef<SimpleSnackBar> {
    return this.errorShown = this.snackBar.open(message, 'API', {
      duration: 5000,
      verticalPosition: 'top',
    });
  }
}
