import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseaseListComponent } from './disease-list.component';
import {DiseaseListCardComponent} from "../disease-list-card/disease-list-card.component";
import {CustomMaterialModule} from "@ncats-frontend-library/shared/custom-material";

describe('DiseaseListComponent', () => {
  let component: DiseaseListComponent;
  let fixture: ComponentFixture<DiseaseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiseaseListComponent, DiseaseListCardComponent ],
      imports: [CustomMaterialModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
