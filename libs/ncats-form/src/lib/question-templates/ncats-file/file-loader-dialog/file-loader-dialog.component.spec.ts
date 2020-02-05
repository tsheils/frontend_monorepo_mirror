import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileLoaderDialogComponent } from './file-loader-dialog.component';

describe('FileLoaderDialogComponent', () => {
  let component: FileLoaderDialogComponent;
  let fixture: ComponentFixture<FileLoaderDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileLoaderDialogComponent ]
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
