import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FacetTableComponent} from './facet-table.component';
import {CustomMaterialModule} from "@ncats-frontend-library/shared/custom-material";

describe('FacetTableComponent', () => {
  let component: FacetTableComponent;
  let fixture: ComponentFixture<FacetTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CustomMaterialModule
      ],
      declarations: [ FacetTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacetTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
