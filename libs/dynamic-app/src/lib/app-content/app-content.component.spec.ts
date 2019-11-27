import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppContentComponent } from './app-content.component';
import {NcatsMaterialModule} from "@ncats-frontend-library/ncats-material-module";
import {RouterTestingModule} from "@angular/router/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('AppContentComponent', () => {
  let component: AppContentComponent;
  let fixture: ComponentFixture<AppContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NcatsMaterialModule,
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