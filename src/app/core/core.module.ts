import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ApiService} from './utils/api.service';
import {throwIfAlreadyLoaded} from './utils/functions/throwIfAlreadyLoaded';
import {StoreModule} from '@ngrx/store';
import {appReducers} from './store/App/App.reducers';
import {metaReducers} from './store/App/localStorageSyncReducer';
import {EffectsModule} from '@ngrx/effects';
import {UserEffects} from './store/user/user.effects';
import {ConfigEffects} from './store/Config/Config.effects';
import {storeDevtoolsModules} from './utils/functions/storeDevtoolsModule';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpErrorInterceptor} from './interceptors/http-error.interceptor';
import {JwtModule} from '@auth0/angular-jwt';
import {getAccessToken} from './utils/functions/getAccessToken';
import {environment} from '../../environments/environment';
import {ConfigService} from './data/config.service';
import {UserService} from './data/user.service';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {AuthEffects} from './store/auth/auth.effects';
import {AuthGuard} from './guard/auth-guard';
import {MusicService} from './data/music.service';
import {SavingSuccessInterceptor} from './interceptors/saving-success.interceptor';
import {MusicEffects} from './store/music/music.effects';
import {MusicianService} from './data/musicians.service';
import {InstrumentService} from './data/instrument.service';
import {InstrumentEffects} from './store/instrument/instrument.effects';
import {ClockCountdownService} from './utils/clock-countdown.service';

export const CORE_SERVICE_PROVIDERS = [
  AuthGuard,
  ApiService,
  ClockCountdownService,
  ConfigService,
  UserService,
  MusicService,
  MusicianService,
  InstrumentService,
];

export const CORE_INTERCEPTOR_PROVIDERS = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: SavingSuccessInterceptor,
    multi: true
  }
];

export const APP_EFFECTS = [
  AuthEffects,
  ConfigEffects,
  UserEffects,
  MusicEffects,
  InstrumentEffects,
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreRouterConnectingModule.forRoot({stateKey: 'router'}),
    StoreModule.forRoot(appReducers, { metaReducers }),
    EffectsModule.forRoot(APP_EFFECTS),
    storeDevtoolsModules(),
    JwtModule.forRoot({
      config: {
        tokenGetter: getAccessToken,
        whitelistedDomains: environment.jwt_whitelisted_domains,
        blacklistedRoutes: environment.jwt_blacklisted_domains,
      }
    })
  ],
  exports: [
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        ...CORE_SERVICE_PROVIDERS,
        ...CORE_INTERCEPTOR_PROVIDERS,
      ],
    } as ModuleWithProviders;
  }
}
