import {environment} from '../../../../environments/environment';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

export function storeDevtoolsModules() {
  return !environment.production ? StoreDevtoolsModule.instrument() : [];
}
