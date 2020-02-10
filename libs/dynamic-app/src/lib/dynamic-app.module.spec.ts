import { async, TestBed } from '@angular/core/testing';
import { DynamicAppModule } from './dynamic-app.module';
import {CustomMaterialModule} from "@ncats-frontend-library/common/ui/custom-material";

describe('DynamicAppModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CustomMaterialModule,
        DynamicAppModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(DynamicAppModule).toBeDefined();
  });
});
