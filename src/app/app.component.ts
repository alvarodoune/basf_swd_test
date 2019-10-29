import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Detecting Talent';
  cognos_url: string;
  bluemix_analytics_url: string;
  loadCognosApi: Promise<any>;

  constructor(
    private router: Router,
    private auth: AuthService
  ) {
    this.cognos_url = environment.cognos_api_js;
  }

  isSignedIn(): boolean {
    return this.auth.isSignedIn();
  }

  onSignInPage(): boolean {
    return this.router.url === '/sign-in';
  }

  ngOnInit() {
    this.loadCognosApi = new Promise((resolve) => {
      this.loadCognosApiScript();
      console.log('cognos script loaded');
    });

    if (environment.segment_key !== '${SEGMENT_KEY}') {
      this.loadScript('../instrumentation/pageTracking.js');
      // this.analyticsService.setupSegment(environment.segment_key);
      this.loadBluemixAnalyticsScript();
    }
  }

  loadCognosApiScript() {
    this.loadScript(this.cognos_url);
  }

  loadBluemixAnalyticsScript() {
    this.loadScript(this.bluemix_analytics_url);
  }

  loadScript(srcUrl) {
    const node = document.createElement('script');
    node.src = srcUrl;
    node.type = 'text/javascript';
    node.async = false;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  }
}
