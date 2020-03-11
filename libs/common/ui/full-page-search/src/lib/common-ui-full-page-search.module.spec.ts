import { async, TestBed } from '@angular/core/testing';
import { CommonUiFullPageSearchModule } from './common-ui-full-page-search.module';
import {CustomMaterialModule} from "@ncats-frontend-library/common/ui/custom-material";

describe('CommonUiFullPageSearchModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CustomMaterialModule,
        CommonUiFullPageSearchModule
      ]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CommonUiFullPageSearchModule).toBeDefined();
  });
});
