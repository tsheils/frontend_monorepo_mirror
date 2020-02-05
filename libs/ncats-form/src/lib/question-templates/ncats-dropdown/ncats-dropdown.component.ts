import {Component, Input, OnInit} from '@angular/core';
import {DropdownQuestion} from "../../question-models/question-dropdown";
import {FormControl, FormGroup} from "@angular/forms";
import {TextboxQuestion} from "../../question-models/question-textbox";

@Component({
  selector: 'lib-ncats-dropdown',
  templateUrl: './ncats-dropdown.component.html',
  styleUrls: ['./ncats-dropdown.component.css']
})
export class NcatsDropdownComponent implements OnInit {
  @Input() question: TextboxQuestion;
  @Input() formControl: FormControl;
  get isValid() { return this.formControl.valid; }
  get isTouched() { return this.formControl.touched; }

  constructor() { }

  ngOnInit() {
  }

}
