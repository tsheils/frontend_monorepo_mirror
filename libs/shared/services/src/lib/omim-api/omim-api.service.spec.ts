import { TestBed } from '@angular/core/testing';

import { OmimApiService } from './omim-api.service';

describe('OmimApiService', () => {
  let service: OmimApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OmimApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
