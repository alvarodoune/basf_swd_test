import { TestBed } from '@angular/core/testing';

import { MlModelApiService } from './ml-model-api.service';

describe('MlModelApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MlModelApiService = TestBed.get(MlModelApiService);
    expect(service).toBeTruthy();
  });
});
