import { Component } from '@angular/core';
import {DropdownQuestion, FileQuestion, MultiselectQuestion, TextboxQuestion} from "@ncats-frontend-library/ncats-form";
import {FormGroup} from "@angular/forms";
import {Neo4jConnectService} from "../../../../utils/neo4j-graphql.service";

@Component({
  selector: 'ncats-frontend-library-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gard-curation';
  form: FormGroup;
  questions = [
    new TextboxQuestion({
      key: 'url',
      label: 'Database Url',
      value: 'bolt://disease.ncats.io:80/',
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
      type: 'password'
    })
  ];

  disease;

  fields: string[];

  connected = false;

  constructor(
    private neo4jConnectService: Neo4jConnectService
  ){}

  ngOnInit(): void {}
  /**
   * form can be set to a value here for curation, but it needs to be targetted to a specific
   * form if multiple forms are loaded
   * todo: async data load
   * @param {FormGroup} form
   * @param {string} formName
   */
  setForm(form : FormGroup) {
    this.form = form;
  }

  clearForm():void {
    this.form.reset();
  }

  connect(form?: string): void {
    const formVals = this.form.value;
    console.log(formVals);
    console.log(this);

    this.neo4jConnectService.connect(formVals).subscribe(res=> {
      console.log(res);
      this.connected = res;
      if(this.connected) {
        this.neo4jConnectService.fetch('match p=(n:`S_GARD`)-[]-(:DATA) return p limit 20').subscribe(res => {
          this.disease = res._fields[0].segments[0].end.properties;
          this.fields = Object.keys(this.disease);
        })
      }
    });
  }

  disconnect():void {
    this.neo4jConnectService.close();
    this.disease = null;
    this.connected = false;
  }
}
