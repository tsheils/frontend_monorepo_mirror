import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginButtonComponent } from './login-button.component';
import {AngularFireAuth} from "@angular/fire/auth";
import {FIRESTORESTUB} from "../../../../../test/firestore-stub";
import {AngularFirestore} from "@angular/fire/firestore";
import {MatDialogModule, MatDialogRef} from "@angular/material";
import {COMMON_CONFIG} from "../../../../../test/test-config";
import {AngularFireModule} from "@angular/fire";
import {NcatsMaterialModule} from "../../../../ncats-material-module/src";

describe('LoginButtonComponent', () => {
  let component: LoginButtonComponent;
  let fixture: ComponentFixture<LoginButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginButtonComponent ],
      imports: [
        NcatsMaterialModule,
        MatDialogModule,
        AngularFireModule.initializeApp(COMMON_CONFIG)
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: AngularFirestore, useValue: FIRESTORESTUB },
        AngularFireAuth
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
