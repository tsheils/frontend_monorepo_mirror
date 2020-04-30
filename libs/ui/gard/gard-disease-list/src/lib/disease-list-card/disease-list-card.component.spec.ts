import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseaseListCardComponent } from './disease-list-card.component';
import {CustomMaterialModule} from "@ncats-frontend-library/shared/custom-material";
import {RouterTestingModule} from "@angular/router/testing";

describe('DiseaseListCardComponent', () => {
  let component: DiseaseListCardComponent;
  let fixture: ComponentFixture<DiseaseListCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CustomMaterialModule,
        RouterTestingModule

      ],
      declarations: [ DiseaseListCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseaseListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
