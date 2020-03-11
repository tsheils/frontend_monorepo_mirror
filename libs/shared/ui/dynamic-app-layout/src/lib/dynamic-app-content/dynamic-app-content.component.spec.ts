import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicAppContentComponent } from './dynamic-app-content.component';
import {RouterTestingModule} from "@angular/router/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CustomMaterialModule} from "@ncats-frontend-library/common/ui/custom-material";

describe('DynamicAppContentComponent', () => {
  let component: DynamicAppContentComponent;
  let fixture: ComponentFixture<DynamicAppContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        CustomMaterialModule
      ],
      declarations: [ DynamicAppContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicAppContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
