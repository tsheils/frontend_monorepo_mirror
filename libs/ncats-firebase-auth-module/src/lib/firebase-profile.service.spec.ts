import { TestBed } from '@angular/core/testing';

import { FirebaseProfileService } from './firebase-profile.service';
import {FIRESTORESTUB} from "../../../../test/firestore-stub";
import {AngularFirestore} from "@angular/fire/firestore";
import {AngularFireAuth} from "@angular/fire/auth";
import {COMMON_CONFIG} from "../../../../test/test-config";
import {AngularFireModule} from "@angular/fire";

describe('FirebaseProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      AngularFireModule.initializeApp(COMMON_CONFIG),
    ],
    providers: [
      AngularFireAuth,
      { provide: AngularFirestore, useValue: FIRESTORESTUB },
    ]
  }));

  it('should be created', () => {
    const service: FirebaseProfileService = TestBed.get(FirebaseProfileService);
    expect(service).toBeTruthy();
  });
});
