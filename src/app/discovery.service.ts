import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiscoveryService {
  readonly ROOT_URL = 'https://gateway-lon.watsonplatform.net';
  readonly version = '2018-08-01';
  readonly enviroment = 'assistant/api/v2/assistants';
  readonly assistant_id = '62a85bcf-487e-4f42-a3bc-cea06fe818c3';

  readonly url =
    'https://gateway-lon.watsonplatform.net/assistant/api/v2/assistants/62a85bcf-487e-4f42-a3bc-cea06fe818c3/sessions?version=2019-02-28';

  readonly username = 'apikey';
  readonly password = 'efIGSPM2egVLwidwUGAqJaMafdj3fbkAhdcZ9z8Cg-Fc';
  readonly base64Code = btoa(`${this.username}:${this.password}`);
  readonly auth = `Basic ${this.username}:${this.password}`;

  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic YXBpa2V5OmVmSUdTUE0yZWdWTHdpZHdVR0FxSmFNYWZkajNmYmtBaGRjWjl6OENnLUZj'
    })
  };

  constructor(private http: HttpClient) {}

  query(): Observable<any> {
    return this.http.post(this.url, {}, this.httpOptions);
  }
}
