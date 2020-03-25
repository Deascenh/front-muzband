import {Injectable} from '@angular/core';
import {ApiService} from '../utils/api.service';
import {Observable} from 'rxjs';
import {Music, User} from '../models';
import {map} from 'rxjs/operators';

@Injectable()
export class MusicService {

  public readonly path: string = 'musics';

  constructor(private api: ApiService) { }

  get(title: string): Observable<User> {
    // TODO title to slug transformation
    const slug = title;

    return this.api.get(`${this.path}/${slug}`).pipe(
      map(data => data as Music),
    );
  }

  getAll(): Observable<User[]> {
    return this.api.get(this.path).pipe(
      map(data => data['hydra:member'] as Music[])
    );
  }

  save(music: Music) {
    if (music.id) {
      return this.api.put(`${this.path}/${music.id}`, music)
        .pipe(map(data => data));
    } else {
      return this.api.post(this.path, music)
        .pipe(map(data => data));
    }
  }
}
