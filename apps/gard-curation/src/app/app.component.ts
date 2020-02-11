import {Component, OnInit} from '@angular/core';
import {TextboxQuestion} from "@ncats-frontend-library/ncats-form";
import {FormGroup} from "@angular/forms";
import {Disease, DiseaseSerializer} from "../../../../models/disease";
import {Neo4jConnectService} from "@ncats-frontend-library/common/data-access/neo4j-connector";

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
}
