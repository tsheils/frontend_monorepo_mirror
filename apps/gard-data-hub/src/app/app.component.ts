import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import RxSession from "neo4j-driver/types/session-rx";
import {MatDialog} from "@angular/material/dialog";
import {QuestionBase, TextboxQuestion} from "@ncats-frontend-library/shared/ui/ncats-form";
import {NavigationExtras, Router} from "@angular/router";
import {DiseasesFacade} from "@ncats-frontend-library/stores/diseases";
import {environment} from "../environments/environment";
import {
  Neo4jConnectionFormComponent,
  Neo4jConnectService
} from "@ncats-frontend-library/shared/data-access/neo4j-connector";

export const QUESTIONS: QuestionBase<any>[] = [
  new TextboxQuestion({
  key: 'url',
  label: 'Database Url',
   value: 'bolt://gard-dev-neo4j.ncats.nih.gov:7687/',
  // value: 'bolt://ifxdev3.ncats.nih.gov:9005/',
  //value: 'bolt://disease.ncats.io:80/',
  required: true
}),
  new TextboxQuestion({
    key: 'user',
    label: 'User',
    required: true,
    value: 'neo4j'
  }),
  new TextboxQuestion({
    key: 'password',
    label: 'Password',
    type: 'password'
  })
  ];

@Component({
  selector: 'ncats-frontend-library-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'gard-data-hub';
  session: RxSession;
  links: any[] = [];
  disease: any;

  constructor (
    public dialog: MatDialog,
    private router: Router,
    private diseasesFacade: DiseasesFacade,
   private connectionService: Neo4jConnectService
  ) {
    this.links = [{link:'mapper'}, {link: 'curation', label: 'curation'}];
  }

  ngOnInit() {
    // todo: this should happen in app_initializer (ans does), but the stats call won't load if this isn't here
    environment.neo4j.forEach(db => {
      this.connectionService.createDriver(db);
    });

   /* this.diseasesFacade.selectedDisease$.subscribe(res=> {
      if(res) {
        console.log(res);
        this.disease = res.disease;
      }
    });*/
  }

  connect(): void {
      const dialogRef = this.dialog.open(Neo4jConnectionFormComponent, {
          height: '75vh',
          width: '66vw',
          data: {
           questions: QUESTIONS
          }
        }
      );

      dialogRef.componentInstance.formValues.subscribe(res=> {
        if (res) {
     //     this.connectionService.connect(res);
          dialogRef.close();
        }
      });

    //this.connectionService.connect({});
  }

  disconnect(): void {
    if(this.session) {
      this.session.close();
      this.session = null;
    }
    this.router.navigate(['/']);
  }

  search(params: NavigationExtras) {
    this.router.navigate(['curation'], params);
  }

  ngOnDestroy(): void {
    this.connectionService.destroy();
    if(this.session) {
      this.session.close();
   //   this.connectionService.driver.close();
    }
  }

}
