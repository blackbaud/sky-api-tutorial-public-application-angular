import { Component, Input, inject } from '@angular/core';
import { Constituent } from '../../models/constituent';
import { AuthorizationService } from '../../services/authorization.service';
import { SkyBoxModule, SkyFluidGridModule, SkyDescriptionListModule } from '@skyux/layout';
import { JsonPipe } from '@angular/common';
import { SkyLabelModule } from '@skyux/indicators';

@Component({
    selector: 'app-constituent-detail',
    templateUrl: './constituent-detail.component.html',
    imports: [
        SkyBoxModule,
        SkyFluidGridModule,
        SkyDescriptionListModule,
        SkyLabelModule,
        JsonPipe,
    ],
})
export class ConstituentDetailComponent {
  private authorizationService = inject(AuthorizationService);

  @Input()
  public constituent: Constituent | undefined;
  public showJson = false;

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
