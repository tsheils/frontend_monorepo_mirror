import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NcatsTextboxComponent } from './ncats-textbox.component';
import {TextboxQuestion} from "@ncats-frontend-library/ncats-form";
import {ReactiveFormsModule} from "@angular/forms";
import {NcatsMaterialModule} from "@ncats-frontend-library/ncats-material-module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('NcatsTextboxComponent', () => {
  let component: NcatsTextboxComponent;
  let fixture: ComponentFixture<NcatsTextboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NcatsTextboxComponent ],
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        NcatsMaterialModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NcatsTextboxComponent);
    component = fixture.componentInstance;
    component.question = new TextboxQuestion({
      key: 'firstName',
      label: 'First name',
      required: true
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
