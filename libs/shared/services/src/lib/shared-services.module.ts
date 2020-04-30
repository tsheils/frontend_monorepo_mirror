import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OmimApiService} from "./omim-api/omim-api.service";

@NgModule({
  imports: [CommonModule],
  providers: [
    OmimApiService
  ]
})
export class SharedServicesModule {}
