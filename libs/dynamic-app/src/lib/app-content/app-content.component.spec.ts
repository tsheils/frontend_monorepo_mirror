import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppContentComponent } from './app-content.component';
import {RouterTestingModule} from "@angular/router/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CustomMaterialModule} from "@ncats-frontend-library/common/ui/custom-material";

describe('AppContentComponent', () => {
  let component: AppContentComponent;
  let fixture: ComponentFixture<AppContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CustomMaterialModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      declarations: [
        AppContentComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
