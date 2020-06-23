import {ChangeDetectorRef, Component, InjectionToken, OnInit, ViewChild} from '@angular/core';
import {DiseasesFacade, fetchHierarchy, setDiseaseStats} from "@ncats-frontend-library/stores/diseases";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {SelectionModel} from "@angular/cdk/collections";
import {NavigationExtras, Router} from "@angular/router";
import {PanelConfig, Position} from "@ncats-frontend-library/shared/ui/dynamic-app-layout";

export const GARD_DASHBOARD_SIDENAV_COMPONENT = new InjectionToken<string>('DashboardSidepanelComponent');
export const GARD_DISEASE_SEARCH_COMPONENT = new InjectionToken<string>('GardDiseaseSearchComponent');
export const DASHBOARD_MAIN_COMPONENT = new InjectionToken<string>('DashboardMainComponent');
export const GARD_FOOTER_COMPONENT = new InjectionToken<string>('GardFooter');



@Component({
  selector: 'ncats-frontend-library-gard-dashboard',
  templateUrl: './gard-dashboard.component.html',
  styleUrls: ['./gard-dashboard.component.scss']
})
export class GardDashboardComponent implements OnInit {

  components: PanelConfig[] = [
    {
      token: GARD_DASHBOARD_SIDENAV_COMPONENT,
      section: Position.Left,
    //  dataObservable: this.facetsObservable$
    },
    {
       token: GARD_DISEASE_SEARCH_COMPONENT,
       section: Position.Content,
     //  dataObservable: this.diseaseObservable$
     },
    {
      token: DASHBOARD_MAIN_COMPONENT,
      section: Position.Content,
   //   dataObservable: this.diseaseObservable$
    },
    /*    {
          token: GARD_FOOTER_COMPONENT,
          section: Position.Footer //,
          // dataObservable: this.diseaseObservable$
        }*/
  ];

  data: any;

  stats = {
    diseaseCount: 0,
    inheritanceCount: 0,
    matchCount: 0,
    misMatchCount: 0
  };

  constructor (
    private diseasesFacade: DiseasesFacade,
    private router: Router,
    private changeRef: ChangeDetectorRef
  ) {

    this.diseasesFacade.dispatch(setDiseaseStats({}));
    this.diseasesFacade.dispatch(fetchHierarchy({node: {value: 'MONDO:0000001'}}));
  }


  ngOnInit(): void {
     this.diseasesFacade.diseases$.subscribe(res => {
       this.data = res;
       this.changeRef.markForCheck()
    });

    this.diseasesFacade.stats$.subscribe(res => {
      if(res && res.diseaseCount) {
        this.stats = res;
      }
    });

this.diseasesFacade.loaded$.subscribe(res => {
   //   this.loaded = res;
    });
  }
}
