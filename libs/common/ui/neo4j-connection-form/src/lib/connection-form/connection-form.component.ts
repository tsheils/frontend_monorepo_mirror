import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TextboxQuestion} from "@ncats-frontend-library/shared/ui/ncats-form";
import {FormGroup} from "@angular/forms";
import {Neo4jConnectService} from "@ncats-frontend-library/common/data-access/neo4j-connector";

@Component({
  selector: 'ncats-frontend-library-connection-form',
  templateUrl: './connection-form.component.html',
  styleUrls: ['./connection-form.component.scss']
})
export class ConnectionFormComponent implements OnInit {
  form: FormGroup;
  @Output() connection: EventEmitter<Neo4jConnectService> = new EventEmitter<Neo4jConnectService>();

  @Input() questions = [
    new TextboxQuestion({
      key: 'url',
      label: 'Database Url',
      value: 'bolt://disease.ncats.io:80/',
      // value: 'bolt://ifxdev3.ncats.nih.gov:9005/',
      required: true
    }),
    new TextboxQuestion({
      key: 'user',
      label: 'User',
      value: 'neo4j',
      required: true
    }),
    new TextboxQuestion({
      key: 'password',
      label: 'Password',
      type: 'password',
      value: 'ix'
    })
  ];

  connected = false;


  constructor(
    private neo4jConnectService: Neo4jConnectService
  ) {
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
    //  this.connect();
  }

  clearForm(): void {
    this.form.reset();
  }

  connect(): void {
    const formVals = this.form.value;
    // console.log(formVals);
    console.log(this);
    this.neo4jConnectService.connect(formVals).subscribe(res => {
      console.log(res);
      this.connected = res;
      this.connection.emit(this.neo4jConnectService)
    });
  }

  disconnect():void {
    console.log('disconnect');
    this.neo4jConnectService.close();
    this.connected = false;
  }
}
