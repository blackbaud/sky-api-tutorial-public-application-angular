import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Constituent } from '../models/constituent';
import { AuthorizationService } from './authorization.service';

@Injectable()
export class ConstituentService {
  private authorizationService = inject(AuthorizationService);
  private httpClient = inject(HttpClient);

  public getConstituent(id: string): Observable<Constituent> {
    return this.httpClient.get<Constituent>(
      `https://api.sky.blackbaud.com/constituent/v1/constituents/${id}`,
      {
        headers: this.authorizationService.skyApiHeaders,
      },
    );
  }
}
