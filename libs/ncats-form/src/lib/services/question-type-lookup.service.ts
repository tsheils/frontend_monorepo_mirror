import {Injectable, Type} from '@angular/core';
import {NcatsTextboxComponent} from "../question-templates/ncats-textbox/ncats-textbox.component";
import {NcatsDropdownComponent} from "../question-templates/ncats-dropdown/ncats-dropdown.component";
import {NcatsMultiselectComponent} from "../question-templates/ncats-multiselect/ncats-multiselect.component";
import {NcatsFileComponent} from "../question-templates/ncats-file/ncats-file.component";

@Injectable({
  providedIn: 'root'
})
export class QuestionTypeLookupService {

  QUESTIONS: Map<string, Type<any>> = new Map<string, Type<any>>();
  constructor() {
    this.QUESTIONS.set('textbox', NcatsTextboxComponent);
    this.QUESTIONS.set('dropdown', NcatsDropdownComponent);
    this.QUESTIONS.set('multiselect', NcatsMultiselectComponent);
    this.QUESTIONS.set('file', NcatsFileComponent);
  }

  getComponent(name: string): Type<any> {
    return this.QUESTIONS.get(name);
  }}

