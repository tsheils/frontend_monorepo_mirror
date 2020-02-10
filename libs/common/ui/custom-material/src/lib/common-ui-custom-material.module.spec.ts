import { async, TestBed } from '@angular/core/testing';
import { CustomMaterialModule } from './common-ui-custom-material.module';

describe('CustomMaterialModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CustomMaterialModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CustomMaterialModule).toBeDefined();
  });
});
