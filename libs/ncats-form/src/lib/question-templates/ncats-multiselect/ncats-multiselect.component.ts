import {Component, Input, OnInit} from '@angular/core';
import {MultiselectQuestion} from "../../question-models/question-multiselect";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'lib-ncats-multiselect',
  templateUrl: './ncats-multiselect.component.html',
  styleUrls: ['./ncats-multiselect.component.css']
})
export class NcatsMultiselectComponent implements OnInit {

  @Input() question: MultiselectQuestion;
  @Input() formControl: FormControl = new FormControl();

  get isValid() { return this.formControl.valid; }
  get isTouched() { return this.formControl.touched; }

  constructor() { }

  ngOnInit() {
  }

}
