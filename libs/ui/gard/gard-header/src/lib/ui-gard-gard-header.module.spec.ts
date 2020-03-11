import { async, TestBed } from '@angular/core/testing';
import { UiGardGardHeaderModule } from './ui-gard-gard-header.module';
import {CustomMaterialModule} from "@ncats-frontend-library/common/ui/custom-material";
import {SharedUiHeaderTemplateModule} from "@ncats-frontend-library/shared/ui/header-template";
import {UiGardDataDisplayModule} from "@ncats-frontend-library/ui/gard/data-display";

describe('UiGardGardHeaderModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        UiGardGardHeaderModule,
        UiGardDataDisplayModule,
        SharedUiHeaderTemplateModule,
        CustomMaterialModule
      ]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(UiGardGardHeaderModule).toBeDefined();
  });
});
