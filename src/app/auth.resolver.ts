import {Injectable} from '@angular/core';

import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import {AdminDataService} from './admin-data.service';
import {Observable} from 'rxjs';

@Injectable()
export class AuthResolver implements Resolve<Observable<any>> {

  constructor(
    private adminDataService: AdminDataService
  ) {
  }

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.adminDataService.getAdminData();
  }
}
