import { TestBed } from '@angular/core/testing';

import { GardDataService } from './gard-data.service';

describe('GardDataService', () => {
  let service: GardDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GardDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
