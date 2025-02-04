import { NgModule } from '@angular/core';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthorizationService } from './shared/services/authorization.service';
import { ConstituentService } from './shared/services/constituent.service';
import { RandomService } from './shared/services/random.service';
import { StateService } from './shared/services/state.service';
import { AppRoutingModule } from './app-routing.module';
import { PkceService } from './shared/services/pkce.service';
import { CallbackComponent } from './auth/callback/callback.component';
import { HomeComponent } from './home/home.component';
import { SkyIconModule } from '@skyux/icon';
import {
  SkyAlertModule,
  SkyLabelModule,
  SkyTokensModule,
  SkyWaitModule,
} from '@skyux/indicators';
import {
  SkyBoxModule,
  SkyDescriptionListModule,
  SkyFluidGridModule,
  SkyPageModule,
  SkyToolbarModule,
} from '@skyux/layout';
import { ConstituentDetailComponent } from './shared/components/constituent-detail/constituent-detail.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    CallbackComponent,
    HomeComponent,
    ConstituentDetailComponent,
  ],
  bootstrap: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    SkyAlertModule,
    SkyBoxModule,
    SkyDescriptionListModule,
    SkyFluidGridModule,
    SkyIconModule,
    SkyLabelModule,
    SkyPageModule,
    SkyTokensModule,
    SkyToolbarModule,
    SkyWaitModule,
  ],
  providers: [
    AuthorizationService,
    ConstituentService,
    PkceService,
    RandomService,
    StateService,
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class AppModule {}
