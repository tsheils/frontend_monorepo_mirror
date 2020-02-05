import {Component, Input, OnInit} from '@angular/core';
import {QuestionBase} from "@ncats-frontend-library/ncats-form";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'ncats-frontend-library-dynamic-form-question',
  templateUrl: './dynamic-form-question.component.html',
  styleUrls: ['./dynamic-form-question.component.scss']
})
export class DynamicFormQuestionComponent implements OnInit {

  @Input() question: QuestionBase<any>;
  @Input() form: FormGroup;

  get isValid() { return this.form.controls[this.question.key].valid; }
  get isTouched() { return this.form.controls[this.question.key].touched; }


  constructor() { }

  ngOnInit() {
  }

}
