import { async, TestBed } from '@angular/core/testing';
import { DiseasesModule } from './diseases.module';

describe('DiseasesModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DiseasesModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(DiseasesModule).toBeDefined();
  });
});
