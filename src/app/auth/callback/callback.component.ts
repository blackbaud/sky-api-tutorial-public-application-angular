import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SkyWaitService } from '@skyux/indicators';
import { catchError, finalize, of } from 'rxjs';
import { AuthroizationResponse } from 'src/app/shared/models/authorization-response';
import { AuthorizationService } from 'src/app/shared/services/authorization.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
})
export class CallbackComponent implements OnInit {
  public error: string | undefined;
  public errorMessage: string | undefined;
  public isWaiting: boolean = true;
  public get hasError(): boolean {
    return !!this.error;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private authorizationService: AuthorizationService,
    private router: Router,
    private waitService: SkyWaitService
  ) {}

  public ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.error = params['error'];

      if (!!this.error) {
        this.errorMessage = params['error_message'];
        this.authorizationService.removeState(params['state']);
        return;
      }

      const authorizationResponse: AuthroizationResponse = {
        code: params['code'],
        state: params['state'],
      };

      this.waitService.beginBlockingPageWait();

      this.authorizationService
        .exchangeAuthorizationCode(authorizationResponse)
        .pipe(
          finalize(() => {
            this.waitService.endBlockingPageWait();
          }),
          catchError((err) => {
            console.log(err);
            this.error = 'exchange_error';
            this.errorMessage =
              'There was an error exchanging the authorization code for an access token';
            return of(undefined);
          })
        )
        .subscribe(() => {
          this.router.navigate(['/']);
        });
    });
  }
}
