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

export const CORE_PROVIDERS = [
  AuthGuard,
  ApiService,
  ConfigService,
  UserService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true
  }
];

export const APP_EFFECTS = [
  AuthEffects,
  ConfigEffects,
  UserEffects,
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
        ...CORE_PROVIDERS,
      ],
    } as ModuleWithProviders;
  }
}
