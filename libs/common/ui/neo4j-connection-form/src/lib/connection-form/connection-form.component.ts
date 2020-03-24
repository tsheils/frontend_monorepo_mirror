import {Component, EventEmitter, Inject, Input, OnInit, Optional, Output} from '@angular/core';
import {QuestionBase} from "@ncats-frontend-library/shared/ui/ncats-form";
import {FormGroup} from "@angular/forms";
import {Neo4jConnectService} from "@ncats-frontend-library/common/data-access/neo4j-connector";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'ncats-frontend-library-connection-form',
  templateUrl: './connection-form.component.html',
  styleUrls: ['./connection-form.component.scss']
})
export class ConnectionFormComponent implements OnInit {
  form: FormGroup;

  @Output() formValues: EventEmitter<any> = new EventEmitter<any>();

  @Input() questions: QuestionBase<any>[] = [];

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if(this.data && this.data.questions) {
      this.questions = this.data.questions;
    }
  }

  ngOnInit(): void {
  }


  /**
   * form can be set to a value here for curation, but it needs to be targetted to a specific
   * form if multiple forms are loaded
   * todo: async data load
   * @param {FormGroup} form
   * @param {string} formName
   */
  setForm(form: FormGroup) {
    this.form = form;
  }

  clearForm(): void {
    this.form.reset();
  }

  connect(): void {
    console.log("connect");
    const formVals = this.form.value;
    this.formValues.emit(formVals);
  }
}
