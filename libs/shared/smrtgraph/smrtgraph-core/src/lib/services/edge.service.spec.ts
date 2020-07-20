import { TestBed, inject } from '@angular/core/testing';

import { EdgeService } from './edge.service';

describe('EdgeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EdgeService]
    });
  });

  it('should be created', inject([EdgeService], (service: EdgeService) => {
    expect(service).toBeTruthy();
  }));
});
