import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constituent } from '../models/constituent';
import { AuthorizationService } from './authorization.service';

@Injectable()
export class ConstituentService {
  constructor(
    private authorizationService: AuthorizationService,
    private httpClient: HttpClient,
  ) {}

  public getConstituent(id: string): Observable<Constituent> {
    return this.httpClient.get<Constituent>(
      `https://api.sky.blackbaud.com/constituent/v1/constituents/${id}`,
      {
        headers: this.authorizationService.skyApiHeaders,
      },
    );
  }
}
