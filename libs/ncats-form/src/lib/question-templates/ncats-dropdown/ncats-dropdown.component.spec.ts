import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NcatsDropdownComponent } from './ncats-dropdown.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NcatsMaterialModule} from "@ncats-frontend-library/ncats-material-module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DropdownQuestion} from "@ncats-frontend-library/ncats-form";

describe('NcatsDropdownComponent', () => {
  let component: NcatsDropdownComponent;
  let fixture: ComponentFixture<NcatsDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NcatsDropdownComponent ],
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        NcatsMaterialModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NcatsDropdownComponent);
    component = fixture.componentInstance;
    component.question = new DropdownQuestion({
      key: 'year',
      label: 'Internship Year',
      options: [
        {key: '2016', value: '2016'},
        {key: '2017', value: '2017'},
        {key: '2018', value: '2018'}
      ],
      required: true
    })
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
