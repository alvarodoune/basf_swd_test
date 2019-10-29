// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000',
  cognos_api_js: 'https://ddetest-us-south.analytics.ibm.com/daas/CognosApi.js',
  // cognos_root_url: 'https://ddetest-us-south.analytics.ibm.com/daas/',
  cognos_root_url: 'https://dde-us-south.analytics.ibm.com/daas/',
  // For proxy mode
  // cognos_api_js: 'http://localhost:3000/daas/CognosApi.js',
  // cognos_root_url: 'http://localhost:3000/daas/',

  toaster_timer: 5000,
  segment_key: '${SEGMENT_KEY}',
  version: '1.0.0',
  bluemix_analytics_js: 'https://console.cdn.stage1.s-bluemix.net/analytics/build/bluemix-analytics.min.js'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
