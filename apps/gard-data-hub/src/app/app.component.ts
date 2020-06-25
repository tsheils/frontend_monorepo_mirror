import {Component, OnInit, ViewEncapsulation} from '@angular/core';

import RxSession from "neo4j-driver/types/session-rx";
import {MatDialog} from "@angular/material/dialog";
import {QuestionBase, TextboxQuestion} from "@ncats-frontend-library/shared/ui/ncats-form";
import {NavigationEnd, NavigationExtras, Router} from "@angular/router";
import {Neo4jConnectionFormComponent} from "@ncats-frontend-library/shared/data-access/neo4j-connector";

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
export class AppComponent implements OnInit {
  title = 'gard-data-hub';
  links: any[] = [];
  disease: any;
  hideSearch = false;

  constructor (
    public dialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.router.events
      .subscribe((e: any) => {
        // If it is a NavigationEnd event re-initalise the component
        if (e instanceof NavigationEnd) {
          this.hideSearch = e.url === '/diseases';
        }
      });
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

  }

  search(params: NavigationExtras) {
    params.replaceUrl = true;
    params.queryParamsHandling = '';
    this.router.navigate(['/curation'], params);
  }
}
