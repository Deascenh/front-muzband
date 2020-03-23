import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {ConfigService} from '../../data/config.service';
import {EConfigActions, GetConfig, GetConfigSuccess} from './Config.actions';
import {switchMap} from 'rxjs/operators';
import {IConfig} from '../../models';
import {of} from 'rxjs';

@Injectable()
export class ConfigEffects {
  @Effect()
  getConfig$ = this.actions$.pipe(
    ofType<GetConfig>(EConfigActions.GetConfig),
    switchMap(() => this.configService.get()),
    switchMap((config: IConfig) => {
      return of (new GetConfigSuccess(config));
    })
  );

  constructor(
    private configService: ConfigService,
    private actions$: Actions,
  ) {}
}
