import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataPanelComponent } from './data-panel.component';
import {CustomMaterialModule} from "@ncats-frontend-library/shared/custom-material";
import {SharedUiCurationMatrixModule} from "@ncats-frontend-library/shared/ui/curation-matrix";
import {UiGardDataDisplayModule} from "@ncats-frontend-library/ui/gard/data-display";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('DataPanelComponent', () => {
  let component: DataPanelComponent;
  let fixture: ComponentFixture<DataPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CustomMaterialModule,
        SharedUiCurationMatrixModule,
        UiGardDataDisplayModule,
        BrowserAnimationsModule
      ],
      declarations: [ DataPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataPanelComponent);
    component = fixture.componentInstance;
    component.data = [{references: []}, {references: ['rrr']}];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
