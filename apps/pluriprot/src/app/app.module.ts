import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {CustomMaterialModule} from "@ncats-frontend-library/shared/custom-material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";

const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'scatter',
    pathMatch: 'full'
  },
  { path: 'index', redirectTo: '/', pathMatch: 'full' },
{
  path: 'data',
    pathMatch: 'full',
  loadChildren: () =>
    import('@ncats-frontend-library/features/pluriprot/scatter-plot').then(
      m => m.FeaturesPluriprotScatterPlotModule
    )
},
  {
  path: 'scatter',
    pathMatch: 'full',
  loadChildren: () =>
  import('@ncats-frontend-library/features/pluriprot/scatter-plot').then(
    m => m.FeaturesPluriprotScatterPlotModule
  )
},
  {
  path: 'network',
    pathMatch: 'full',
  loadChildren: () =>
  import('@ncats-frontend-library/features/pluriprot/network').then(
    m => m.FeaturesPluriprotNetworkModule
  )
}
];


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES, {
      scrollPositionRestoration: 'enabled',
     // onSameUrlNavigation: 'reload',
      initialNavigation: 'enabled'
    }),
    CustomMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
