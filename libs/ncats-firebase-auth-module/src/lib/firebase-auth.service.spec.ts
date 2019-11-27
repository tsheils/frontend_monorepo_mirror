import { TestBed } from '@angular/core/testing';

import { FirebaseAuthService } from './firebase-auth.service';
import {COMMON_CONFIG} from "../../../../test/test-config";
import {FIRESTORESTUB} from "../../../../test/firestore-stub";
import {AngularFireModule} from "@angular/fire";
import {AngularFirestore} from "@angular/fire/firestore";
import {AngularFireAuth} from "@angular/fire/auth";

describe('FirebaseAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      AngularFireModule.initializeApp(COMMON_CONFIG),
    ],
    providers: [
      { provide: AngularFirestore, useValue: FIRESTORESTUB },
      AngularFireAuth
    ]
  }));

  it('should be created', () => {
    const service: FirebaseAuthService = TestBed.get(FirebaseAuthService);
    expect(service).toBeTruthy();
  });
});
