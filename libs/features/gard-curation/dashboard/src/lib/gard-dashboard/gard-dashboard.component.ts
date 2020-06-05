import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {DiseasesFacade, Page, setDiseaseStats} from "@ncats-frontend-library/stores/diseases";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {SelectionModel} from "@angular/cdk/collections";
import {NavigationExtras, Router} from "@angular/router";
import {PanelConfig, Position} from "@ncats-frontend-library/shared/ui/dynamic-app-layout";
import {
  CURATION_MAIN_COMPONENT,
  CURATION_SIDEPANEL_COMPONENT,
  GARD_DISEASE_HEADER_COMPONENT, GARD_DISEASE_SEARCH_COMPONENT, GARD_FOOTER_COMPONENT
} from "../../../../curation/src/lib/curation-feature/curation-feature.component";


/**
 * navigation options to merge query parameters that are added on in navigation/query/facets/pagination
 */
const navigationExtras: NavigationExtras = {
  queryParamsHandling: 'merge'
};

@Component({
  selector: 'ncats-frontend-library-gard-dashboard',
  templateUrl: './gard-dashboard.component.html',
  styleUrls: ['./gard-dashboard.component.scss']
})
export class GardDashboardComponent implements OnInit {

/*
  components: PanelConfig[] = [
    {
      token: CURATION_SIDEPANEL_COMPONENT,
      section: Position.Left,
      dataObservable: this.facetsObservable$
    },
   /!* {
      token: GARD_DISEASE_HEADER_COMPONENT,
      section: Position.Content,
      dataObservable: this.diseaseObservable$
    },*!/
    /!*{
       token: GARD_DISEASE_SEARCH_COMPONENT,
       section: Position.Content,
     //  dataObservable: this.diseaseObservable$
     },*!/
    {
      token: CURATION_MAIN_COMPONENT,
      section: Position.Content,
      dataObservable: this.diseaseObservable$
    },
    /!*    {
          token: GARD_FOOTER_COMPONENT,
          section: Position.Footer //,
          // dataObservable: this.diseaseObservable$
        }*!/
  ];
*/

  stats = {
    diseaseCount: 0,
    inheritanceCount: 0,
    matchCount: 0,
    misMatchCount: 0
  };

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  @ViewChild(MatSort, {static: false}) set content(sort: MatSort) {
    this.dataSource.sort = sort;
  }
/*
  /!**
   * Paginator object from Angular Material
   *
   *!/
  @ViewChild(MatPaginator) set paginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }*/

//  dataSource: MatTableDataSource<Disease> = new MatTableDataSource<Disease>();
  dataSource: any;

  /**
   * selection model to track selected filters
   * @type {SelectionModel<string>}
   */
  filterSelection = new SelectionModel<any>(true, []);

  columns: string[] = [];

  displayColumns = ['gard_id', 'name'];

  selectedValues: any[] = [];

  field = "diseases";

  page: Page;

  loaded = false;

  constructor (
    private diseasesFacade: DiseasesFacade,
    private router: Router,
    private changeRef: ChangeDetectorRef
  ) {

    this.diseasesFacade.dispatch(setDiseaseStats({}));
  }


  ngOnInit(): void {
     this.diseasesFacade.diseases$.subscribe(res => {
       this.dataSource = res;
       this.changeRef.markForCheck()
    });

    this.diseasesFacade.stats$.subscribe(res => {
      if(res && res.diseaseCount) {
        this.stats = res;
      }
    });

    this.diseasesFacade.page$.subscribe(res => {
      this.page = res;
    });

this.diseasesFacade.loaded$.subscribe(res => {
      this.loaded = res;
    });


    this.dataSource.paginator = this.paginator;

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  diseaseSearch(navExtras: NavigationExtras) {
    this.router.navigate(['curation'], navExtras)
  }


  // todo pull paginator and functionality into separate library
  /**
   * change pages of list
   * @param event
   */
  paginationChanges(event: any) {
    navigationExtras.queryParams = {
      pageIndex: event.pageIndex,
      pageSize: event.pageSize
    };
    this._navigate(navigationExtras);
  }

  /**
   * navigate on changes, mainly just changes url, shouldn't reload entire page, just data
   * @param {NavigationExtras} navExtras
   * @private
   */
  private _navigate(navExtras: NavigationExtras): void {
    this.router.navigate([], navExtras);
  }



}
