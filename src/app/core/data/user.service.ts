import {Injectable} from '@angular/core';
import {ApiService} from '../utils/api.service';
import {Observable} from 'rxjs';
import {User} from '../models';
import {map} from 'rxjs/operators';

@Injectable()
export class UserService {
  public static readonly path: string = 'users';

  private static makePath(uuid: string): string {
    return uuid.includes(UserService.path) ? uuid : `${UserService.path}/${uuid}`;
  }

  constructor(private api: ApiService) { }

  get(uuid: string): Observable<User> {
    return this.api.get(UserService.makePath(uuid)).pipe(
      map(data => new User(data)),
    );
  }

  getAll(): Observable<User[]> {
    return this.api.get(UserService.path).pipe(
      map(data => {
        data['hydra:member'] = data['hydra:member'].map(user => new User(user));
        return data;
      })
    );
  }
}
