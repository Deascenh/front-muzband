import {Injectable} from '@angular/core';
import {ApiService} from '../utils/api.service';
import {Observable} from 'rxjs';
import {Musician} from '../models';
import {map} from 'rxjs/operators';

@Injectable()
export class MusicianService implements DataService<Musician> {
  public static readonly path: string = 'musicians';

  private static makePath(id: number | string): string {
    return id.toString().includes(MusicianService.path) ? id.toString() : `${MusicianService.path}/${id}`;
  }

  constructor(private api: ApiService) { }

  get(id: number | string): Observable<Musician> {
    return this.api.get(MusicianService.makePath(id)).pipe(
      map(data => new Musician(data)),
    );
  }

  getAll(): Observable<Musician[]> {
    return this.api.get(MusicianService.path).pipe(
      map(data => this.deserializeHydraMember(data))
    );
  }

  save(musician: Musician) {
    if (musician['@id']) {
      return this.api.put(musician['@id'], musician)
        .pipe(map(data => data));
    } else {
      return this.api.post(MusicianService.path, musician)
        .pipe(map(data => data));
    }
  }

  deserializeHydraMember(data: any): Musician[] {
    data['hydra:member'] = data['hydra:member'].map(musician => new Musician(musician));
    return data;
  }
}
