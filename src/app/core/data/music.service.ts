import {Injectable} from '@angular/core';
import {ApiService} from '../utils/api.service';
import {Observable} from 'rxjs';
import {Music} from '../models';
import {map} from 'rxjs/operators';

@Injectable()
export class MusicService implements DataService<Music> {
  public static readonly path: string = 'musics';

  private static makePath(id: number | string): string {
    return id.toString().includes(MusicService.path) ? id.toString() : `${MusicService.path}/${id}`;
  }

  constructor(private api: ApiService) { }

  get(id: number | string): Observable<Music> {
    return this.api.get(MusicService.makePath(id)).pipe(
      map(data => new Music(data)),
    );
  }

  getAll(): Observable<Music[]> {
    return this.api.get(MusicService.path).pipe(
      map(data => this.deserializeHydraMember(data))
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

  deserializeHydraMember(data: any): Music[] {
    data['hydra:member'] = data['hydra:member'].map(music => new Music(music));
    return data;
  }
}
