import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurationSidepanelComponent } from './curation-sidepanel/curation-sidepanel.component';
import {CustomMaterialModule} from "@ncats-frontend-library/common/ui/custom-material";

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule
  ],
  declarations: [CurationSidepanelComponent]
})
export class UiGardCurationSidepanelModule {}
