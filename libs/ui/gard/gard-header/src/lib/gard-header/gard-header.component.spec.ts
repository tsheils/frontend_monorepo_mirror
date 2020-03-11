import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GardHeaderComponent } from './gard-header.component';
import {SharedUiHeaderTemplateModule} from "@ncats-frontend-library/shared/ui/header-template";
import {CustomMaterialModule} from "@ncats-frontend-library/common/ui/custom-material";
import {RouterTestingModule} from "@angular/router/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('GardHeaderComponent', () => {
  let component: GardHeaderComponent;
  let fixture: ComponentFixture<GardHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedUiHeaderTemplateModule,
        CustomMaterialModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      declarations: [ GardHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
