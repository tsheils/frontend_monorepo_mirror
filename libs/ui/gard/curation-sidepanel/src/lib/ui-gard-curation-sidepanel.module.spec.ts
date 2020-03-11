import { async, TestBed } from '@angular/core/testing';
import { UiGardCurationSidepanelModule } from './ui-gard-curation-sidepanel.module';
import {CustomMaterialModule} from "@ncats-frontend-library/common/ui/custom-material";

describe('UiGardCurationSidepanelModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CustomMaterialModule,
        UiGardCurationSidepanelModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(UiGardCurationSidepanelModule).toBeDefined();
  });
});
