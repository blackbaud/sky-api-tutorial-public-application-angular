import { Injectable, inject } from '@angular/core';
import { RandomService } from './random.service';

@Injectable()
export class StateService {
  private randomService = inject(RandomService);

  private possibleChacters = 'abcdefghijklmnopqrstuvwxyz0123456789';

  public getState(length = 40): string {
    return this.randomService.randomString(this.possibleChacters, length);
  }
}
