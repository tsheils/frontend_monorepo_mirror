import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NcatsMaterialModule} from "@ncats-frontend-library/ncats-material-module";
import {LoginModalComponent} from "./login-modal/login-modal.component";
import { LoginButtonComponent } from './login-button/login-button.component';

@NgModule({
  imports: [
    CommonModule,
    NcatsMaterialModule
  ],
  declarations: [
    LoginModalComponent,
    LoginButtonComponent
  ],
  entryComponents: [
    LoginModalComponent,
    LoginButtonComponent
  ],
  exports: [
    LoginButtonComponent
  ]})
export class NcatsFirebaseAuthModule {}
