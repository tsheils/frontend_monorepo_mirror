import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NcatsFileComponent } from './ncats-file.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NcatsMaterialModule} from "@ncats-frontend-library/ncats-material-module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatDialogModule} from "@angular/material";
import {FileQuestion} from "@ncats-frontend-library/ncats-form";

describe('NcatsFileComponent', () => {
  let component: NcatsFileComponent;
  let fixture: ComponentFixture<NcatsFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NcatsFileComponent ],
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        NcatsMaterialModule,
        MatDialogModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NcatsFileComponent);
    component = fixture.componentInstance;
    component.question =  new FileQuestion({
      key: 'poster',
      label: 'Poster',
      type: 'file'
    })
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
