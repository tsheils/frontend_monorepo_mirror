import { async, TestBed } from '@angular/core/testing';
import { DynamicAppModule } from './dynamic-app.module';

describe('DynamicAppModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DynamicAppModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(DynamicAppModule).toBeDefined();
  });
});
