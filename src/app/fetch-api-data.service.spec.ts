import { TestBed } from '@angular/core/testing';

import { FetchDataApiService as FetchApiDataService } from './fetch-api-data.service';

describe('FetchApiDataService', () => {
  let service: FetchApiDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchApiDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
