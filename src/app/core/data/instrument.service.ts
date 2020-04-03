import {Injectable} from '@angular/core';
import {ApiService} from '../utils/api.service';
import {Observable} from 'rxjs';
import {Instrument, Music} from '../models';
import {map} from 'rxjs/operators';

@Injectable()
export class InstrumentService implements DataService<Instrument> {
  public static readonly path: string = 'instruments';

  private static makePath(id: number | string): string {
    return id.toString().includes(InstrumentService.path) ? id.toString() : `${InstrumentService.path}/${id}`;
  }

  constructor(private api: ApiService) { }

  get(id: number | string): Observable<Instrument> {
    return this.api.get(InstrumentService.makePath(id)).pipe(
      map(data => new Instrument(data)),
    );
  }

  getAll(): Observable<Instrument[]> {
    return this.api.get(InstrumentService.path).pipe(
      map(data => this.deserializeHydraMember(data))
    );
  }

  save(instrument: Instrument): Observable<Instrument> {
    if (instrument.id) {
      return this.api.put(InstrumentService.makePath(instrument.id), instrument)
        .pipe(map(data => new Instrument(data)));
    } else {
      return this.api.post(InstrumentService.path, instrument)
        .pipe(map(data => new Instrument(data)));
    }
  }

  deserializeHydraMember(data: any): Instrument[] {
    data['hydra:member'] = data['hydra:member'].map(instrument => new Instrument(instrument));
    return data;
  }
}
