import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {SessionService} from './session.service';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private session: SessionService
  ) {
  }

  public signIn(username: string, password: string): Observable<any> {
    // ToDo(): call real API
    return Observable.create(function (obs) {
      if (username !== 'basf' || password !== 'basf') {
        obs.error('User or Password incorrect');
      } else {
        setTimeout(function () {

          obs.next({
            'token': '1234',
            'name': 'admin'
          });
          obs.complete();
        }, 1000);
      }
    });
  }

  public getAdminData(): Observable<any> {
    return Observable.create(function (obs) {
      obs.next('dummy admin data response');
      obs.complete();
    });
  }

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }

  private getRequestOptions() {
    const headers = new Headers({
      'Authorization': 'Bearer ' + this.session.accessToken
    });
    return new RequestOptions({headers});
  }
}
