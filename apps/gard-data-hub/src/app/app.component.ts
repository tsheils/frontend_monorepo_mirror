import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  Neo4jConnectionFormComponent,
  Neo4jConnectService
} from "@ncats-frontend-library/common/data-access/neo4j-connector";
import RxSession from "neo4j-driver/types/session-rx";
import {MatDialog} from "@angular/material/dialog";
import {QuestionBase, TextboxQuestion} from "@ncats-frontend-library/shared/ui/ncats-form";
import {Router} from "@angular/router";
import {DiseasesFacade} from "@ncats-frontend-library/stores/diseases";
import {map} from "rxjs/operators";

 export const QUESTIONS: QuestionBase<any>[] = [
  new TextboxQuestion({
  key: 'url',
  label: 'Database Url',
  // value: 'bolt://gard-dev-neo4j.ncats.nih.gov:7687/',
  // value: 'bolt://ifxdev3.ncats.nih.gov:9005/',
  value: 'bolt://disease.ncats.io:80/',
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
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'gard-data-hub';
  session: RxSession;
  links: any[] = [];
  diseases: any;
  diseases2: any;
  diseases3: any;
  diseases4: any;

  constructor (
    public dialog: MatDialog,
    private router: Router,
    private diseasesFacade: DiseasesFacade,
    private connectionService: Neo4jConnectService
  ) {
    this.connectionService.session$.subscribe(res => {
      this.session = res;
      this.links = [{link:'mapper'}, {link: 'curation', label: 'curation'}];
      });
  }

  ngOnInit() {
    this.diseases2 = this.diseasesFacade.loaded$;
    this.diseases3 = this.diseasesFacade.allDiseases$;
    this.diseases4 = this.diseasesFacade.searchDiseases$;
    this.diseases = this.diseasesFacade.selectedDiseases$;
    this.diseases2.pipe(
      map(res => {console.log(res)})
    ).subscribe();
    this.diseases3.pipe(
      map(res => {console.log(res)})
    ).subscribe();
   this.diseases3.pipe(
      map(res => {console.log(res)})
    ).subscribe();

   this.diseases4.pipe(
      map(res => {console.log(res)})
    ).subscribe();
    console.log(this.diseases3);
    console.log(this.diseases);
    console.log(this)
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
          this.connectionService.connect(res);
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

  ngOnDestroy(): void {
    if(this.session) {
      this.session.close();
      this.connectionService.driver.close();
    }
  }

}
