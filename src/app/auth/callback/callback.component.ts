import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SkyWaitService, SkyAlertModule } from '@skyux/indicators';
import { catchError, finalize, of } from 'rxjs';
import { AuthroizationResponse } from 'src/app/shared/models/authorization-response';
import { AuthorizationService } from 'src/app/shared/services/authorization.service';
import { SkyThemeComponentClassDirective } from '@skyux/theme';

@Component({
    selector: 'app-callback',
    templateUrl: './callback.component.html',
    imports: [
        SkyThemeComponentClassDirective,
        SkyAlertModule,
        RouterLink,
    ],
})
export class CallbackComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private authorizationService = inject(AuthorizationService);
  private router = inject(Router);
  private waitService = inject(SkyWaitService);

  public error: string | undefined;
  public errorMessage: string | undefined;
  public isWaiting = true;
  public get hasError(): boolean {
    return !!this.error;
  }

  public ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.error = params['error'];

      if (this.error) {
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
          }),
        )
        .subscribe(() => {
          this.router.navigate(['/']);
        });
    });
  }
}
