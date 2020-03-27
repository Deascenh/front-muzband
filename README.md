# MuzBand
Readme last update 2020-03-27

## What technologies are in it?
- **Angular V8** framework and some of its official features
- @angular/material as base Theme
- NgRx (Redux pattern for Angular) :
    >@ngrx/{store, effects, router-store, store-devtool}
    - Used by the **built-in security system**
    - Used to manage central application resources
- 
- @auth0/angular-jwt :
    - Provide an Http Token Interceptor
    - Provide jwtHelperService
- ngrx-store-localstorage
- moment
- bootstrap

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Tests
- ### Unit Tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

- ### End-to-end Tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
