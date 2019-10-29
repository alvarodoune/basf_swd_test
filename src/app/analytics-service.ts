import {Injectable} from '@angular/core';
// import * as segment from './segment';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  public sessionId: string;
  segment: any;

  constructor() {
  }

  async setupSegment(key: string) {
    await this.segment.setUp(
      {
        'segment_key': key,
        'coremetrics': false,
        'optimizely': false,
        'googleAddServices': false,
        'addRoll': false,
        'fullStory': false,
        'autoPageView': false,
        'skipIdentify': false
      }
    );
  }

  setSession(sessionId: string) {
    this.sessionId = sessionId;
  }

  loadPage(category: string, name: string) {
    this.segment.page(category, name);
  }

  sendTrack(eventName: string, traits: any) {
    this.segment.track(eventName, traits);
  }
}
