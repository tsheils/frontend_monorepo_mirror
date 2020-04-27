import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SidenavPanelComponent} from './sidenav-panel.component';
import {ActivatedRoute} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {MOCKACTIVATEDROUTE} from "../../../../../../../test/mock-activate-route";
import {CustomMaterialModule} from "@ncats-frontend-library/shared/custom-material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";

describe('SidenavPanelComponent', () => {
  let component: SidenavPanelComponent;
  let fixture: ComponentFixture<SidenavPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavPanelComponent ],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        BrowserModule,
        CustomMaterialModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavPanelComponent);
    component = fixture.componentInstance;
    component.activeFragment = "home";
    component.activeElement = "home";
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
