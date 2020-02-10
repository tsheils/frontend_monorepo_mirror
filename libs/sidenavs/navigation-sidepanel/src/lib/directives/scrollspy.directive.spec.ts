import {ScrollspyDirective} from './scrollspy.directive';
import {async, TestBed} from '@angular/core/testing';
import {SidenavPanelComponent} from '../sidenav-panel.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";


describe('ScrollspyDirective', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavPanelComponent ],
      imports: [
      ],
      providers: [
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
      .compileComponents();
  }));

  it('should create an instance', () => {
    const directive = new ScrollspyDirective(null, null, null, null);
   // directive._intersectionObserver = new IntersectionObserver(() => {});
    expect(directive).toBeTruthy();
  });
});
