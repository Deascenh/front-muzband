// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {EnvironmentInterface} from './environment.interface';

export const environment: EnvironmentInterface = {
  production: false,
  paired_api_base_url: 'http://localhost:8000/api/',
  jwt_whitelisted_domains: ['localhost:8000'],
  jwt_blacklisted_domains: [],
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
