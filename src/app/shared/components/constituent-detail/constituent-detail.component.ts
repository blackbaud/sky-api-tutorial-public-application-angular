import { Component, Input } from '@angular/core';
import { Constituent } from '../../models/constituent';
import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'app-constituent-detail',
  templateUrl: './constituent-detail.component.html',
})
export class ConstituentDetailComponent {
  constructor(private authorizationService: AuthorizationService) {}

  @Input()
  public constituent: Constituent | undefined;
  public showJson: boolean = false;

  public get hasAccessToken(): boolean {
    return this.authorizationService.hasAccessToken;
  }

  public get birthdate(): string | undefined {
    return !this.constituent || !this.constituent.birthdate
      ? undefined
      : `${this.constituent.birthdate.m}/${this.constituent.birthdate.d}/${this.constituent.birthdate.y}`;
  }

  public toggleShowJson(): void {
    this.showJson = !this.showJson;
  }
}
