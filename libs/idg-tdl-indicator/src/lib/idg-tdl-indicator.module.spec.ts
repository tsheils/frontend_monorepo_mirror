import { async, TestBed } from '@angular/core/testing';
import { IdgTdlIndicatorModule } from './idg-tdl-indicator.module';

describe('IdgTdlIndicatorModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [IdgTdlIndicatorModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(IdgTdlIndicatorModule).toBeDefined();
  });
});
