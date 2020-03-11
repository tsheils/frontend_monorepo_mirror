import { async, TestBed } from '@angular/core/testing';
import { SharedUiHeaderTemplateModule } from './shared-ui-header-template.module';
import {CustomMaterialModule} from "@ncats-frontend-library/common/ui/custom-material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterTestingModule} from "@angular/router/testing";

describe('SharedUiHeaderTemplateModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedUiHeaderTemplateModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        CustomMaterialModule
      ]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedUiHeaderTemplateModule).toBeDefined();
  });
});
