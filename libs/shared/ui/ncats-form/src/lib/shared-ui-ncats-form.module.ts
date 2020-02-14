import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ReactiveFormsModule} from "@angular/forms";
import {CustomMaterialModule} from "@ncats-frontend-library/common/ui/custom-material";
import {NcatsFileComponent} from "./question-templates/ncats-file/ncats-file.component";
import {NcatsMultiselectComponent} from "./question-templates/ncats-multiselect/ncats-multiselect.component";
import {NcatsDropdownComponent} from "./question-templates/ncats-dropdown/ncats-dropdown.component";
import {NcatsTextboxComponent} from "./question-templates/ncats-textbox/ncats-textbox.component";
import {NcatsAutocompleteComponent} from "./question-templates/ncats-autocomplete/ncats-autocomplete.component";
import {DynamicContentDirective} from "./directives/dynamic-content.directive";
import {DndDirective} from "./question-templates/ncats-file/file-loader-dialog/dnd.directive";
import {FileLoaderDialogComponent} from "./question-templates/ncats-file/file-loader-dialog/file-loader-dialog.component";
import {NcatsFormComponent} from "./ncats-form.component";

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CustomMaterialModule
  ],
  declarations: [
    NcatsFormComponent,
    NcatsFileComponent,
    NcatsMultiselectComponent,
    NcatsDropdownComponent,
    NcatsTextboxComponent,
    NcatsAutocompleteComponent,
    DynamicContentDirective,
    DndDirective,
    FileLoaderDialogComponent
  ],
  exports: [
    NcatsFormComponent
  ]
})
export class SharedUiNcatsFormModule {}
