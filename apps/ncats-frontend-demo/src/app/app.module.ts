import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NcatsFirebaseAuthModule} from "@ncats-frontend-library/ncats-firebase-auth-module";
import {IdgTdlIndicatorModule} from "@ncats-frontend-library/idg-tdl-indicator";
import {AngularFireModule} from "@angular/fire";
import {environment} from "../environments/environment.prod";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {RouterModule, Routes} from "@angular/router";
import {DynamicAppModule} from "@ncats-frontend-library/dynamic-app";

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('@ncats-frontend-library/dynamic-app').then(m => m.DynamicAppModule)
  }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    NcatsFirebaseAuthModule,
    IdgTdlIndicatorModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule,
    DynamicAppModule,
    // imports firebase/auth, only needed for auth features,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
