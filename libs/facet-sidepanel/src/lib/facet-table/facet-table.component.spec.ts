import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacetTableComponent } from './facet-table.component';
import {NcatsMaterialModule} from "@ncats-frontend-library/ncats-material-module";
import {RouterTestingModule} from "@angular/router/testing";

describe('FacetTableComponent', () => {
  let component: FacetTableComponent;
  let fixture: ComponentFixture<FacetTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NcatsMaterialModule
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
