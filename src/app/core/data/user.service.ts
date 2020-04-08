import {Injectable} from '@angular/core';
import {ApiService} from '../utils/api.service';
import {Observable} from 'rxjs';
import {Instrument, User} from '../models';
import {map} from 'rxjs/operators';

@Injectable()
export class UserService implements DataService<User> {
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
      map(data => this.deserializeHydraMember(data))
    );
  }

  save(user: User): Observable<User> {
    if (user.id) {
      return this.api.put(UserService.makePath(user.id), user)
        .pipe(map(data => new User(data)));
    } else {
      return this.api.post(UserService.path, user)
        .pipe(map(data => new User(data)));
    }
  }

  delete(user: User) {
    if (user['@id']) {
      return this.api.delete(user['@id'], user);
    }
  }

  deserializeHydraMember(data: any): User[] {
    data['hydra:member'] = data['hydra:member'].map(user => new User(user));
    return data;
  }
}
