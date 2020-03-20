import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GardDashboardComponent } from './gard-dashboard.component';
import {CustomMaterialModule} from "@ncats-frontend-library/common/ui/custom-material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CommonUiNeo4jConnectionFormModule} from "@ncats-frontend-library/common/ui/neo4j-connection-form";
import {SharedUiCurationMatrixModule} from "@ncats-frontend-library/shared/ui/curation-matrix";
import {SharedUiSearchBarModule} from "@ncats-frontend-library/shared/ui/search-bar";
import {RouterTestingModule} from "@angular/router/testing";

describe('GardDashboardComponent', () => {
  let component: GardDashboardComponent;
  let fixture: ComponentFixture<GardDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CustomMaterialModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        CommonUiNeo4jConnectionFormModule
      ],
      declarations: [ GardDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GardDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
