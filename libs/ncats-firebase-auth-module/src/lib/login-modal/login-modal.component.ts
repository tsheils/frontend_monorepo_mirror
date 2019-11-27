import { Component, OnInit } from '@angular/core';
import {FirebaseAuthService} from "../firebase-auth.service";
import {MatDialogRef} from "@angular/material";

@Component({
  selector: 'ncats-fel-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent {
  /**
   * gets input from modal about which service to use
   * @param dialogRef
   * @param firebaseAuthService
   */
  constructor(
    private dialogRef: MatDialogRef<LoginModalComponent>,
    private firebaseAuthService: FirebaseAuthService
  ) { }

  /**
   * use firebase's facebook login methods
   */
  loginFacebook() {
    this.firebaseAuthService.doLogin(this.dialogRef, 'facebook');
  }

  /**
   * use firebase's google login methods
   */
  loginGoogle() {
    this.firebaseAuthService.doLogin(this.dialogRef, 'google');
  }

  /**
   * use firebase's twitter login methods
   */
  loginTwitter() {
    this.firebaseAuthService.doLogin(this.dialogRef, 'twitter');
  }

  /**
   * use firebase's github login methods
   */
  loginGithub() {
    this.firebaseAuthService.doLogin(this.dialogRef, 'github');
  }

  /**
   * use firebase's email login methods
   * todo: not currently used
   */
  loginEmail() {
    // this.firebaseAuthService.doRegister(this.dialogRef);
  }
}
