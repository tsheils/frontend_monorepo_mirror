import {Component, Input, OnInit} from '@angular/core';
import {DropdownQuestion} from "../../question-models/question-dropdown";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'lib-ncats-dropdown',
  templateUrl: './ncats-dropdown.component.html',
  styleUrls: ['./ncats-dropdown.component.css']
})
export class NcatsDropdownComponent implements OnInit {
  @Input() question: DropdownQuestion;
  @Input() formControl: FormControl = new FormControl();
  get isValid() { return this.formControl.valid; }
  get isTouched() { return this.formControl.touched; }

  constructor() { }

  ngOnInit() {
  }

}
