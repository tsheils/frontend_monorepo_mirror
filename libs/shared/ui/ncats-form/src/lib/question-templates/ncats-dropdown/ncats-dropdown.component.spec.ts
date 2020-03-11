import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NcatsDropdownComponent } from './ncats-dropdown.component';
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CustomMaterialModule} from "@ncats-frontend-library/common/ui/custom-material";
import {DropdownQuestion} from "@ncats-frontend-library/shared/ui/ncats-form";

describe('NcatsDropdownComponent', () => {
  let component: NcatsDropdownComponent;
  let fixture: ComponentFixture<NcatsDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NcatsDropdownComponent ],
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        CustomMaterialModule
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
