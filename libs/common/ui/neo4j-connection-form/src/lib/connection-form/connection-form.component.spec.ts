import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionFormComponent } from './connection-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CustomMaterialModule} from "@ncats-frontend-library/common/ui/custom-material";
import {SharedUiNcatsFormModule} from "@ncats-frontend-library/shared/ui/ncats-form";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";
import {CommonModule} from "@angular/common";

describe('ConnectionFormComponent', () => {
  let component: ConnectionFormComponent;
  let fixture: ComponentFixture<ConnectionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        CustomMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        SharedUiNcatsFormModule
      ],
      declarations: [
        ConnectionFormComponent
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
