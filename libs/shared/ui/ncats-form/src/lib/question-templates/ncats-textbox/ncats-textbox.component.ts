import {Component, Input, OnInit} from '@angular/core';
import {TextboxQuestion} from "../../question-models/question-textbox";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'lib-ncats-textbox',
  templateUrl: './ncats-textbox.component.html',
  styleUrls: ['./ncats-textbox.component.css']
})
export class NcatsTextboxComponent implements OnInit {
  @Input() question: TextboxQuestion;
  @Input() formControl: FormControl = new FormControl();
  get isValid() { return this.formControl.valid; }
  get isTouched() { return this.formControl.touched; }
  constructor() { }

  ngOnInit() {
  }

}
