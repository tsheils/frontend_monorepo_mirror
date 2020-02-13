import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NcatsFileComponent } from './ncats-file.component';
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { MatDialogModule } from "@angular/material/dialog";
import {CustomMaterialModule} from "@ncats-frontend-library/common/ui/custom-material";
import {FileQuestion} from "@ncats-frontend-library/shared/ui/ncats-form";

describe('NcatsFileComponent', () => {
  let component: NcatsFileComponent;
  let fixture: ComponentFixture<NcatsFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NcatsFileComponent ],
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        CustomMaterialModule,
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
