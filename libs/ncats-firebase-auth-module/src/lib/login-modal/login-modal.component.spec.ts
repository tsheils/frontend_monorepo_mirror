import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginModalComponent} from './login-modal.component';
import {AngularFireModule} from "@angular/fire";
import {COMMON_CONFIG} from "../../../../../test/test-config";
import {MatDialogRef} from "@angular/material";
import {AngularFirestore} from "@angular/fire/firestore";
import {FIRESTORESTUB} from "../../../../../test/firestore-stub";
import {AngularFireAuth} from "@angular/fire/auth";
import {NcatsMaterialModule} from "@ncats-frontend-library/ncats-material-module";

describe('LoginModalComponent', () => {
  let component: LoginModalComponent;
  let fixture: ComponentFixture<LoginModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginModalComponent ],
      imports: [
        NcatsMaterialModule,
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
    fixture = TestBed.createComponent(LoginModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
