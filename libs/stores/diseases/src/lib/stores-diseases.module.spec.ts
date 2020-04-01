import { async, TestBed } from '@angular/core/testing';
import { StoresDiseasesModule } from './stores-diseases.module';

describe('StoresDiseasesModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoresDiseasesModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StoresDiseasesModule).toBeDefined();
  });
});
