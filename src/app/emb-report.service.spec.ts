import { TestBed } from '@angular/core/testing';

import { EmbReportService } from './emb-report.service';

describe('EmbReportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmbReportService = TestBed.get(EmbReportService);
    expect(service).toBeTruthy();
  });
});
