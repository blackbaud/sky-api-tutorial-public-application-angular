import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SkyWaitService } from '@skyux/indicators';
import { catchError, finalize, of } from 'rxjs';
import { AccessToken } from '../shared/models/access_token';
import { Constituent } from '../shared/models/constituent';
import { AuthorizationService } from '../shared/services/authorization.service';
import { ConstituentService } from '../shared/services/constituent.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  public constituent: Constituent | undefined;
  public error: string | null = null;

  // You may need to change this to a valid constituent ID in your environment
  private constituentId: string = '280';

  constructor(
    private authorizationService: AuthorizationService,
    private constituentService: ConstituentService,
    private waitService: SkyWaitService
  ) {}

  public ngOnInit(): void {
    if (!this.hasAccessToken) {
      if (!!this.accessTokens && !!this.accessTokens[0]) {
        this.useAccessToken(this.accessTokens[0]);
      }
    }

    if (this.hasAccessToken) {
      this.loadConstituent();
    }
  }

  public newAccessToken(): void {
    this.authorizationService.authorize();
  }

  public get accessTokens(): AccessToken[] {
    return this.authorizationService.validAccessTokens();
  }

  public useAccessToken(token: AccessToken) {
    this.error = null;
    this.authorizationService.accessToken = token;
    this.loadConstituent();
  }

  public clearAccessTokens(): void {
    this.authorizationService.accessTokens = null;
    this.authorizationService.accessToken = null;
    window.location.reload();
  }

  public get hasAccessToken(): boolean {
    return this.authorizationService.hasAccessToken;
  }

  public isSelectedToken(token: string): boolean {
    return token == this.authorizationService.accessToken?.access_token;
  }

  private loadConstituent() {
    this.error = null;
    this.waitService.beginBlockingPageWait();

    this.constituentService.getConstituent(this.constituentId).pipe(
      finalize(() => {
        this.waitService.endBlockingPageWait();
      }),
      catchError(response => {
        if (response instanceof HttpErrorResponse && response.status === 401) {
          if (!!this.authorizationService.accessToken) {
            this.authorizationService.removeAccessToken(this.authorizationService.accessToken);
          }
          this.authorizationService.accessToken = null;
          window.location.reload();
        }
        this.error = response.error.detail;
        return of(undefined);
      })
    ).subscribe(constituent => this.constituent = constituent);
  }
}
