import {Injectable} from '@angular/core';
import {ApiService} from '../utils/api.service';
import {Observable} from 'rxjs';
import {Music, Musician} from '../models';
import {map} from 'rxjs/operators';
import {MusicianService} from './musicians.service';

@Injectable()
export class MusicService implements DataService<Music> {
  public static readonly path: string = 'musics';

  private static makePath(id: number | string): string {
    return id.toString().includes(MusicService.path) ? id.toString() : `${MusicService.path}/${id}`;
  }

  constructor(
    private api: ApiService,
    private musicianService: MusicianService,
  ) { }

  /**
   * @param { number | string } id Music id/@id
   */
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

  /**
   * @param { number | string } id Music id/@id
   */
  getMusicians(id: number | string): Observable<Musician[]> {
    const path = MusicService.makePath(id) + `/${MusicianService.path}`;
    return this.api.get(path).pipe(
      map(data => this.musicianService.deserializeHydraMember(data)),
    );
  }

  save(music: Music) {
    if (music['@id']) {
      return this.api.put(music['@id'], music)
        .pipe(map(data => new Music(data)));
    } else {
      return this.api.post(MusicService.path, music)
        .pipe(map(data => new Music(data)));
    }
  }

  deserializeHydraMember(data: any): Music[] {
    data['hydra:member'] = data['hydra:member'].map(music => new Music(music));
    return data;
  }
}
