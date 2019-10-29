import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {EmbReportService} from '../emb-report.service';
import {AnalyticsService} from '../analytics-service';
// import * as instrumentation from '../../assets/resources/instrumentation.json';

// import { CognosApi } from '../../CognosApi.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  public disableDashboardBarButtons = true;
  public isLoading = true;

  // @ViewChild(DdeToasterComponent) private toasterComp: DdeToasterComponent;

  constructor(private ddeApiService: EmbReportService, private analyticsService: AnalyticsService) {
  }

  ngOnInit() {
    this.isLoading = true;
  }

  frameLoaded(event: any) {
    this.isLoading = false;
  }

  ngAfterViewInit() {
    // this.loadDasboard();
    // this.analyticsService.loadPage((<any>instrumentation).categoryValue, (<any>instrumentation).endUserPageName);
  }

  async loadDasboard() {
    try {
      await this.ddeApiService.createNewSession();
      await this.ddeApiService.createAndInitApiFramework();
      await this.ddeApiService.openDashboard();
      this.disableDashboardBarButtons = false;
    }
    catch (e) {
      console.error(e);
      // this.toasterComp.showToaster(new Toaster((<any>instrumentation).errorMessage, 'error', true));
    }
  }

}
