import { TestBed, inject } from '@angular/core/testing';

import { QuestionInjectorService } from './question-injector.service';

describe('QuestionInjectorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestionInjectorService]
    });
  });

  it('should be created', inject([QuestionInjectorService], (service: QuestionInjectorService) => {
    expect(service).toBeTruthy();
  }));
});
