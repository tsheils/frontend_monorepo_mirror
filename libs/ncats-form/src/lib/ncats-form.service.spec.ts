import { TestBed, inject } from '@angular/core/testing';

import { NcatsFormService } from './ncats-form.service';

describe('NcatsFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NcatsFormService]
    });
  });

  it('should be created', inject([NcatsFormService], (service: NcatsFormService) => {
    expect(service).toBeTruthy();
  }));
});
