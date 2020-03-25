import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {environment} from '../../../environments/environment';
import {catchError} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';

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
  private httpOptions: HttpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      Accept: 'application/json, application/ld+json',
    }),
  };

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
  ) { }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    this.httpOptions.params = params;

    return this.http.get(
      `${environment.paired_api_base_url}${path}`,
      this.httpOptions,
    ).pipe(catchError(this.handleErrors.bind(this)));
  }

  put(path: string, body: object = {}): Observable<any> {
    return this.http.put(
      `${environment.paired_api_base_url}${path}`,
      JSON.stringify(body),
      this.httpOptions,
    ).pipe(catchError(this.handleErrors.bind(this)));
  }

  post(path: string, body: object = {}): Observable<any> {
    return this.http.post(
      `${environment.paired_api_base_url}${path}`,
      JSON.stringify(body),
      this.httpOptions,
    ).pipe(catchError(this.handleErrors.bind(this)));
  }

  download(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    this.httpOptions.params = params;
    this.httpOptions.responseType = 'blob';

    return this.http.get(
      `${environment.paired_api_base_url}${path}`,
      this.httpOptions,
    ).pipe(catchError(this.handleErrors.bind(this)));
  }

  upload(path: string, body: object = {}, params: HttpParams = new HttpParams()): Observable<any> {
    this.httpOptions.params = params;
    this.httpOptions.reportProgress = true;

    return this.http.post(
      `${environment.paired_api_base_url}${path}`,
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
      `${environment.paired_api_base_url}${path}`,
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
    const action = 'Http';
    let message = '';

    if (error.status >= 500 || error.status === 0) {
      message = 'Server error';
    } else if (error.status === 401) {
      message = 'Authentication issue';
    }

    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top',
    });

    return of(error);
  }
}
