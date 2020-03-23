import { Injectable } from '@angular/core';
import {ApiService} from '../utils/api.service';
import {Observable} from 'rxjs';
import {User} from '../models';
import {map} from 'rxjs/operators';

@Injectable()
export class UserService {

  public readonly path: string = 'users';

  constructor(private api: ApiService) { }

  get(uuid: string): Observable<User> {
    return this.api.get(`${this.path}/${uuid}`).pipe(
      map(data => data as User),
    );
  }

  getAll(): Observable<User[]> {
    return this.api.get(this.path).pipe(
      map(data => data['hydra:member'] as User[])
    );
  }
}
