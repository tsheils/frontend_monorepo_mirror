import { async, TestBed } from '@angular/core/testing';
import { SidenavsFacetSidepanelModule } from './sidenavs-facet-sidepanel.module';
import {CustomMaterialModule} from "@ncats-frontend-library/common/ui/custom-material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FilterPanelComponent} from "./filter-panel/filter-panel.component";
import {FacetTableComponent} from "./facet-table/facet-table.component";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";
import {SharedUiDynamicAppLayoutModule} from "@ncats-frontend-library/shared/ui/dynamic-app-layout";

describe('SidenavsFacetSidepanelModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SidenavsFacetSidepanelModule,
        CustomMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        SharedUiDynamicAppLayoutModule
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SidenavsFacetSidepanelModule).toBeDefined();
  });
});
