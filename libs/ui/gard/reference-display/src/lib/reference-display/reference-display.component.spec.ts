import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceDisplayComponent } from './reference-display.component';
import {DiseasesFacade} from "@ncats-frontend-library/stores/diseases";

describe('ReferenceDisplayComponent', () => {
  let component: ReferenceDisplayComponent;
  let fixture: ComponentFixture<ReferenceDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferenceDisplayComponent ],
      providers: [DiseasesFacade]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenceDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
