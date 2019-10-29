import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DownloadPDFService {

  readonly ROOT_URL = 'https://openwhisk.ng.bluemix.net/api/v1/web/Frank%40Catalytics.ai_dev/default/getPdfContent.json';
  readonly BUCKET_NAME = '4dt-discoverycorpus-v1';

  constructor(private http: HttpClient) { }

  downloadPDF(fileName: string): Observable<any> {
    return  this.http.post(`${this.ROOT_URL}`,
      {
        'bucketName': this.BUCKET_NAME,
        'fileName': fileName
      }, {
        headers: {
          'content-type': 'application/json'
        }
      });
  }
}
