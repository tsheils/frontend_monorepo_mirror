import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NcatsMultiselectComponent} from './ncats-multiselect.component';
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CustomMaterialModule} from "@ncats-frontend-library/shared/custom-material";
import {MultiselectQuestion} from "@ncats-frontend-library/shared/ui/ncats-form";

describe('NcatsMultiselectComponent', () => {
  let component: NcatsMultiselectComponent;
  let fixture: ComponentFixture<NcatsMultiselectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NcatsMultiselectComponent ],
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        CustomMaterialModule
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
