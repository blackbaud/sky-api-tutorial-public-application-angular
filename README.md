# Blackbaud SKY Developer Public Application using Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.10.

## Getting started

1. Update the `clientId` and `subscriptionKey` variables in `shared/services/authorization.service.ts` to the keys obtained from your Developer Account and registered application. 
2. This example takes advantage of the SKY Developer Cohort. You may may need to change the `constituentId` in `home/home.component.ts` to a valid constituent ID from the environment you selected during OAuth Authorization.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:5000/`. The application will automatically reload if you change any of the source files.

## Using the application

1. If you have no SKY API access tokens, then the application will automatically redirect you to the Blackbaud SKY API OAuth flow to authorize the application in the environment of your choosing. If you do not have access to your own Blackbaud environment, you can [request access](mailto:skyapi@blackbaud.com) to the following SKY Developer Cohort sandboxes.
2. After gaining an access token, you will be redirected to the home page where constituent data is displayed.
3. You may create a new access token or clear the existing access tokens.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
