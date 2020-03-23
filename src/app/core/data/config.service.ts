import {Injectable} from '@angular/core';
import {ApiService} from '../utils/api.service';
import {Observable} from 'rxjs';
import {IConfig} from '../models';

@Injectable()
export class ConfigService {

  public readonly path: string = 'config';

  constructor(private api: ApiService) { }

  get(): Observable<IConfig> {
    return this.api.get(this.path);
  }
}
