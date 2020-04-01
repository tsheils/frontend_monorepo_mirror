import { TestBed } from '@angular/core/testing';

import { GardDiseaseService } from './gard-disease.service';

describe('GardDiseaseService', () => {
  let service: GardDiseaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GardDiseaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
