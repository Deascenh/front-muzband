import {Injectable} from '@angular/core';
import {ApiService} from '../utils/api.service';
import {Observable} from 'rxjs';
import {Music, User} from '../models';
import {map} from 'rxjs/operators';

@Injectable()
export class MusicService {
  public static readonly path: string = 'musics';

  private static makePath(id: string): string {
    return id.includes(MusicService.path) ? id : `${MusicService.path}/${id}`;
  }

  constructor(private api: ApiService) { }

  get(id: string): Observable<Music> {
    return this.api.get(MusicService.makePath(id)).pipe(
      map(data => new Music(data)),
    );
  }

  getAll(): Observable<Music[]> {
    return this.api.get(MusicService.path).pipe(
      map(data => {
        data['hydra:member'] = data['hydra:member'].map(music => new Music(music));
        return data;
      })
    );
  }

  save(music: Music) {
    if (music['@id']) {
      return this.api.put(music['@id'], music)
        .pipe(map(data => data));
    } else {
      return this.api.post(MusicService.path, music)
        .pipe(map(data => data));
    }
  }
}
