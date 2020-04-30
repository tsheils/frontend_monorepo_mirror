import {TestBed} from '@angular/core/testing';

import {OmimApiService} from './omim-api.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('OmimApiService', () => {
  let service: OmimApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
    });
    service = TestBed.inject(OmimApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
