import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileLoaderDialogComponent } from './file-loader-dialog.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NcatsMaterialModule} from "@ncats-frontend-library/ncats-material-module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DndDirective} from "./dnd.directive";
import {MatDialogRef} from "@angular/material";

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
        NcatsMaterialModule
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
