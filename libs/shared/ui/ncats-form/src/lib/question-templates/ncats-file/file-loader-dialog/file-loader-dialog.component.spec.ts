import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileLoaderDialogComponent } from './file-loader-dialog.component';
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DndDirective} from "./dnd.directive";
import { MatDialogRef } from "@angular/material/dialog";
import {CustomMaterialModule} from "@ncats-frontend-library/common/ui/custom-material";

describe('FileLoaderDialogComponent', () => {
  let component: FileLoaderDialogComponent;
  let fixture: ComponentFixture<FileLoaderDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DndDirective,
        FileLoaderDialogComponent
      ],
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        CustomMaterialModule
      ],
      providers: [
        {provide: MatDialogRef, useValue: {}},

      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileLoaderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
