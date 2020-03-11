import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GardDiseaseHeaderComponent } from './gard-disease-header.component';
import {CustomMaterialModule} from "@ncats-frontend-library/common/ui/custom-material";

describe('GardDiseaseHeaderComponent', () => {
  let component: GardDiseaseHeaderComponent;
  let fixture: ComponentFixture<GardDiseaseHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CustomMaterialModule
      ],
      declarations: [ GardDiseaseHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GardDiseaseHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
