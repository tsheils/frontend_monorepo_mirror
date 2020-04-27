import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginModalComponent} from "./login-modal/login-modal.component";
import { LoginButtonComponent } from './login-button/login-button.component';
import {CustomMaterialModule} from "@ncats-frontend-library/shared/custom-material";

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule
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
