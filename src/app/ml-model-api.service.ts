import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MlModelApiService {

  readonly ROOT_URL = 'https://ibm-watson-ml.mybluemix.net/v3/identity/token';
  readonly version = '2018-08-01';
  readonly username = 'b7aa3d9b-2ae1-4a80-99ce-348cafb6707b';
  readonly password = '32d24360-0d8b-4856-825d-ffd721aa3a80';
  readonly wml_instances = '35769f64-7fb4-4058-ab8d-076c986855bd';
  readonly wml_deployments = 'ec18f830-a978-4e7d-87a9-259b536d41f5';
  readonly base64Code = btoa(`${this.username}:${this.password}`);
  wml_credentials = new Map();
  private wmlToken;
  private csvUrl = 'https://openwhisk.ng.bluemix.net/api/v1/web/De.Castro.Guillermo%40outlook.com_dev/EmployAttrition/GetEmployeeAttrition.json';

  constructor(private http: HttpClient) {
    this.wml_credentials.set('url', 'https://ibm-watson-ml.mybluemix.net');
    this.wml_credentials.set('username', this.username);
    this.wml_credentials.set('password', this.password);
    // this.apiGet().subscribe(response => {
    //   if (response) {
    //     const token = JSON.parse(response.srcElement.response).token;
    //     console.log('******* Token *****: ' + token);
    //     this.wmlToken = token;
    //   }
    // });
  }

  postAttritionAndCost(employeeId: number) {
    return this.http.post(`${this.csvUrl}`,
      {
        'EmployeeNumber': employeeId
      }, {
        headers: {
          'content-type': 'application/json',
        }
      });
  }

  apiGet(): Observable<any> {
    // const TOKEN_PATH = '/v3/identity/token';
    // const tokenHeader = 'Basic ' + btoa((this.wml_credentials.get('username') + ':'
    //   + this.wml_credentials.get('password')));
    // const url = this.wml_credentials.get('url');
    // const tokenUrl = url + TOKEN_PATH;

    return this.http.get(
      `${this.ROOT_URL}`,
      {
        headers: {
          'content-type': 'application/json',
          'authorization': `Basic ${this.base64Code}`
        }
      }
      // {
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Access-Control-Allow-Origin': '*',
      //     // 'Authorization': `Basic ${this.base64Code}`
      //   },
      //   withCredentials: true
      // }
    );
  }

  // apiPost(employeeID?: string): Observable<any> {
  //
  //   // const url = `https://us-south.ml.cloud.ibm.com/v3/wml_instances/${this.wml_instances}/deployments/${this.wml_deployments}/online`;
  //   const url = `https://us-south.ml.cloud.ibm.com/v3/wml_instances/${this.wml_instances}/deployments/${this.wml_deployments}/online`;
  //   const payload = {
  //     'fields': ['Age', 'BusinessTravel', 'DailyRate', 'Department', 'DistanceFromHome', 'Education', 'EducationField', 'EmployeeCount', 'EmployeeNumber', 'EnvironmentSatisfaction', 'Gender', 'HourlyRate', 'JobInvolvement', 'JobLevel', 'JobRole', 'JobSatisfaction', 'MaritalStatus', 'MonthlyIncome', 'AnnualIncome', 'PreviousAnnualIncome', 'MonthlyRate', 'NumCompaniesWorked', 'Over18', 'OverTime', 'PercentSalaryHike', 'PerformanceRating', 'PerformanceRatingRevised', 'RelationshipSatisfaction', 'StandardHours', 'StockOptionLevel', 'TotalWorkingYears', 'TrainingTimesLastYear', 'WorkLifeBalance', 'YearsAtCompany', 'YearsInCurrentRole', 'YearsSinceLastPromotion', 'YearsWithCurrManager', 'Openness', 'Conscientiousness', 'Extraversion', 'Agreeableness', 'Neuroticism'],
  //     'values': [[33, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]]
  //   };
  //
  //   this.wmlToken = 'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRJZCI6IjM1NzY5ZjY0LTdmYjQtNDA1OC1hYjhkLTA3NmM5ODY4NTViZCIsImluc3RhbmNlSWQiOiIzNTc2OWY2NC03ZmI0LTQwNTgtYWI4ZC0wNzZjOTg2ODU1YmQiLCJwbGFuSWQiOiIzZjZhY2Y0My1lZGU4LTQxM2EtYWM2OS1mOGFmM2JiMGNiZmUiLCJyZWdpb24iOiJ1cy1zb3V0aCIsInVzZXJJZCI6ImI3YWEzZDliLTJhZTEtNGE4MC05OWNlLTM0OGNhZmI2NzA3YiIsImlzcyI6Imh0dHBzOi8vdXMtc291dGgubWwuY2xvdWQuaWJtLmNvbS92My9pZGVudGl0eSIsImlhdCI6MTU0MDkyODQzNiwiZXhwIjoxNTQwOTU3MjM2fQ.eM2mBxpcrB0jJmMfSTgKpUF_g5FHy3punHie4hJpypM755grHoB_yol7dqSFugMD5Eql7e79lAznNT3jmEPoqFzwJW3ese0-LD4xcm2-19WNV7pgGSAZmuXWeXx2ZPYn70YXYpE0yy6ChL6lUFxs0mpHEm-JXTTCy_IQ9-BZO6C_68dZkMQ6V31OEiiP13tos9nCbvGaJaHK_JPGzG5yAwBaSXxKLupjdi3ttcK8lzx-1nVeYAauB0ZRS-3KPRhCeVxlAP39Fdch7zivWmFT0NrtJGzns9Q15Y7E8qrAifJ1BXt-8L0NJwxu2Zvd7edXLU9ikhQ6xKjAfB7wClfJNg';
  //
  //   return this.http.post(
  //     `${url}`,
  //     {
  //       payload: payload
  //     }, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Access-Control-Allow-Origin': '*',
  //         'Authorization': `Bearer ${this.wmlToken}`
  //       }
  //     });
  // }
}
