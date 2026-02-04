import { Injectable, inject } from '@angular/core';
import {
  CanActivate,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from './shared/services/authorization.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private authorizationService = inject(AuthorizationService);

  public canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authorizationService.hasAccessToken) {
      return true;
    } else {
      this.authorizationService.authorize();
      return false;
    }
  }
}
