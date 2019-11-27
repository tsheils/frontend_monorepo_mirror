import { Component, OnInit } from '@angular/core';
import {LoginModalComponent} from "../login-modal/login-modal.component";
import {MatDialog} from "@angular/material";
import {FirebaseProfileService} from "../firebase-profile.service";

@Component({
  selector: 'ncats-fel-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.scss']
})
export class LoginButtonComponent implements OnInit {

  /**
   * profile object
   * todo: create type object and see if useer and profile can be merged
   */
  profile: any;

  constructor(
    public dialog: MatDialog,
    private profileService: FirebaseProfileService
  ) { }

  ngOnInit() {
    this.profileService.profile$.subscribe(profile => {
      this.profile = profile && profile.data() ? profile.data() : profile;
    });
  }

  /**
   * opens modal for user to sign in
   */
  openSignInModal() {
    this.dialog.open(LoginModalComponent, {
        height: '75vh',
        width: '66vw',
      }
    );
  }

  /**
   * sign out user
   */
  signOut(): void {
    this.profileService.logout();
  }
}
