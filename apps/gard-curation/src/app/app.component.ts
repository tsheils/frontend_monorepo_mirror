import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Disease, DiseaseSerializer} from "../../../../models/disease";
import {Neo4jConnectService} from "@ncats-frontend-library/common/data-access/neo4j-connector";
import {TextboxQuestion} from "@ncats-frontend-library/shared/ui/ncats-form";

@Component({
  selector: 'ncats-frontend-library-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
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

  disease: Disease;
  diseaseSerializer: DiseaseSerializer = new DiseaseSerializer();

  fields: string[];

  editing: string;

  connected = false;

  curatedObject: {} = {};

  testdata = [
    {value: 'synonym1', references: ['ref1', 'ref2', 'ref3', 'ref4']},
    {value: 'synonym2', references: ['ref1', 'ref12', 'ref13', 'ref4']},
    {value: 'synonym3', references: ['ref6', 'ref4', 'ref3', 'ref5']},
    {value: 'synonym4', references: ['ref1', 'ref2', 'ref8', 'ref9']},
    {value: 'synonym5', references: ['ref1', 'ref2', 'ref3', 'ref4']},
    {value: 'synonym6', references: ['ref9', 'ref6', 'ref10', 'ref4']},
    {value: 'synonym7', references: ['ref10', 'ref12', 'ref13']},
    {value: 'synonym8', references: ['ref1']},
    {value: 'synonym80', references: []},
    {
      value: 'synonym9',
      references: ['ref1', 'ref2', 'ref3', 'ref4', 'ref5', 'ref6', 'ref7', 'ref8', 'ref9', 'ref10', 'ref11', 'ref12', 'ref13', 'ref14']
    },
    {value: 'synonym10', references: ['ref10', 'ref12', 'ref13', 'ref14']}
  ];

  newTestData: any[];

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

  connect(): void {
    const formVals = this.form.value;
    console.log(formVals);
    console.log(this);

    this.neo4jConnectService.connect(formVals).subscribe(res=> {
      console.log(res);
      this.connected = res;
      if(this.connected) {
        this.neo4jConnectService.fetch(
          `match p=(n:S_GARD)-[]-(:DATA) where 'CYSTIC FIBROSIS' in n.N_Name return p`
//        'match p=(n:`S_GARD`)-[]-(:DATA) return p limit 20'
        ).subscribe(data => {
          console.log(data);
          this.disease = this.diseaseSerializer.fromJson(data._fields[0].segments[0].end.properties);
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

  setCuratedObject(object, field): void {
    console.log(object);
    console.log(field);
    this.curatedObject[field] = object;
  }

  setObject(field: string): void {
    console.log(field);
    this.disease[field] = this.curatedObject[field];
    this.newTestData = this.curatedObject[field];
    this.editing = null;
  }
}
