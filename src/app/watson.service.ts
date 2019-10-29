import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WatsonService {
  readonly ROOT_URL = 'https://gateway-lon.watsonplatform.net';
  readonly version = '2018-09-20';
  readonly assistantID: '62a85bcf-487e-4f42-a3bc-cea06fe818c3';

  readonly url =
    'https://gateway-lon.watsonplatform.net/assistant/api/v2/assistants/62a85bcf-487e-4f42-a3bc-cea06fe818c3/sessions';

  //#region Real
  readonly workspace_id = 'ea0c2d9e-6736-4d05-a71b-be7908693517';
  readonly username = 'apikey';
  readonly password = 'efIGSPM2egVLwidwUGAqJaMafdj3fbkAhdcZ9z8Cg-Fc';

  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic YXBpa2V5OmVmSUdTUE0yZWdWTHdpZHdVR0FxSmFNYWZkajNmYmtBaGRjWjl6OENnLUZj'
    })
  };

  readonly base64Code = btoa(`${this.username}:${this.password}`);

  constructor(private http: HttpClient) {}

  message(sessionId: string, input: string = 'hello'): Observable<any> {
    return this.http.post(
      `${this.url}/${sessionId}/message?version=${this.version}`,
      {
        input: {
          text: input
        }
      },
      this.httpOptions
    );
  }
}
