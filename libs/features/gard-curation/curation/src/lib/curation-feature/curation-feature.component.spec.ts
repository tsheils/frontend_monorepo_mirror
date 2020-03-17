import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurationFeatureComponent } from './curation-feature.component';
import {CustomMaterialModule} from "@ncats-frontend-library/common/ui/custom-material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SharedUiMapperUiModule} from "@ncats-frontend-library/shared/ui/mapper-ui";
import {SharedUiSearchBarModule} from "@ncats-frontend-library/shared/ui/search-bar";
import {UiGardCurationSidepanelModule} from "@ncats-frontend-library/ui/gard/curation-sidepanel";
import {SharedUiCurationMatrixModule} from "@ncats-frontend-library/shared/ui/curation-matrix";
import {CommonUiNeo4jConnectionFormModule} from "@ncats-frontend-library/common/ui/neo4j-connection-form";

describe('CurationFeatureComponent', () => {
  let component: CurationFeatureComponent;
  let fixture: ComponentFixture<CurationFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CustomMaterialModule,
        BrowserAnimationsModule,
        CommonUiNeo4jConnectionFormModule,
        SharedUiCurationMatrixModule,
        SharedUiSearchBarModule
      ],
      declarations: [ CurationFeatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurationFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
