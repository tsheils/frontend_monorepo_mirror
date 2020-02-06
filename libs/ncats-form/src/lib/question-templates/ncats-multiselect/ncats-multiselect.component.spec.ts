import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NcatsMultiselectComponent } from './ncats-multiselect.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NcatsMaterialModule} from "@ncats-frontend-library/ncats-material-module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatDialogModule} from "@angular/material";
import {MultiselectQuestion} from "@ncats-frontend-library/ncats-form";

describe('NcatsMultiselectComponent', () => {
  let component: NcatsMultiselectComponent;
  let fixture: ComponentFixture<NcatsMultiselectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NcatsMultiselectComponent ],
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        NcatsMaterialModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NcatsMultiselectComponent);
    component = fixture.componentInstance;
    component.question =  new MultiselectQuestion({
      key: 'mentors',
      label: 'Mentors',
      options: [
        {key: 'Trung', value: 'Trung'},
        {key: 'Alexy', value: 'Alexy'},
        {key: 'Tyler', value: 'Tyler'}
      ],
      required: true
    })
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
