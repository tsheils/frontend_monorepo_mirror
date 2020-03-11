import { async, TestBed } from '@angular/core/testing';
import {SharedUiDynamicAppLayoutModule} from "./shared-ui-dynamic-app-layout.module";
import {CustomMaterialModule} from "@ncats-frontend-library/common/ui/custom-material";

describe('SharedUiDynamicAppLayoutModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CustomMaterialModule,
        SharedUiDynamicAppLayoutModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedUiDynamicAppLayoutModule).toBeDefined();
  });
});
