# BaseFront
Readme last update 2020-03-23

## What Official technologies are in it? ?
- @angular/material as base Theme
- NgRx (Redux pattern) :
    - Used by the built-in security system
- @auth0/angular-jwt :
    - Provide an Http Token Interceptor
    - Provide jwtHelperService
- moment
- bootstrap

## What Custom systems are in it?
- User authentication management
- Communication interface with external APIs

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Tests
- ### Unit Tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

- ### End-to-end Tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
