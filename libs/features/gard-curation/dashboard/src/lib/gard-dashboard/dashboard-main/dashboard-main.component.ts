import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {DiseasesFacade, setDiseaseStats} from "@ncats-frontend-library/stores/diseases";
import {NavigationExtras, Router} from "@angular/router";
import {SelectionModel} from "@angular/cdk/collections";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Page} from "@ncats-frontend-library/models/interfaces/core-interfaces";

/**
 * navigation options to merge query parameters that are added on in navigation/query/facets/pagination
 */
const navigationExtras: NavigationExtras = {
  queryParamsHandling: 'merge'
};

@Component({
  selector: 'ncats-frontend-library-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.scss']
})
export class DashboardMainComponent implements OnInit {
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

    this.diseasesFacade.page$.subscribe(res => {
      if(res) {
        this.page = res;
      }
    });

    this.diseasesFacade.loaded$.subscribe(res => {
      this.loaded = res;
    });

    this.diseasesFacade.stats$.subscribe(res => {
      if(res && res.diseaseCount) {
        this.stats = res;
      }
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
