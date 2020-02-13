import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NcatsTextboxComponent } from './ncats-textbox.component';

import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CustomMaterialModule} from "@ncats-frontend-library/common/ui/custom-material";
import {TextboxQuestion} from "@ncats-frontend-library/shared/ui/ncats-form";

describe('NcatsTextboxComponent', () => {
  let component: NcatsTextboxComponent;
  let fixture: ComponentFixture<NcatsTextboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NcatsTextboxComponent ],
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        CustomMaterialModule
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
