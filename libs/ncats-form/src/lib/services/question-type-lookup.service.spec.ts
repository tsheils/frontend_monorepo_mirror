import { TestBed } from '@angular/core/testing';

import { QuestionTypeLookupService } from './question-type-lookup.service';

describe('QuestionTypeLookupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuestionTypeLookupService = TestBed.get(QuestionTypeLookupService);
    expect(service).toBeTruthy();
  });
});
