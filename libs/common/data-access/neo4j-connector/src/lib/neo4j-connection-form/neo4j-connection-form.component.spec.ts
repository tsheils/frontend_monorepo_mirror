import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Neo4jConnectionFormComponent } from './neo4j-connection-form.component';
import {CommonModule} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CustomMaterialModule} from "@ncats-frontend-library/common/ui/custom-material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedUiNcatsFormModule} from "@ncats-frontend-library/shared/ui/ncats-form";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";

describe('Neo4jConnectionFormComponent', () => {
  let component: Neo4jConnectionFormComponent;
  let fixture: ComponentFixture<Neo4jConnectionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        CustomMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        SharedUiNcatsFormModule
      ],
      declarations: [
        Neo4jConnectionFormComponent
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Neo4jConnectionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
