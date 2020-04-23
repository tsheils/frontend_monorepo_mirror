import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Neo4jConnectService} from "@ncats-frontend-library/common/data-access/neo4j-connector";
import RxSession from "neo4j-driver/types/session-rx";
import {DiseasesFacade, setDiseaseStats} from "@ncats-frontend-library/stores/diseases";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {NavigationExtras, Router} from "@angular/router";
import {Disease} from "../../../../../../../models/gard/disease";


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

  dataSource: MatTableDataSource<Disease> = new MatTableDataSource<Disease>();

  /**
   * selection model to track selected filters
   * @type {SelectionModel<string>}
   */
  filterSelection = new SelectionModel<any>(true, []);

  columns: string[] = [];

  displayColumns = ['gard_id', 'name'];

  selectedValues: any[] = [];

  field = "diseases";


  constructor (
    private diseasesFacade: DiseasesFacade,
    private router: Router,
    private changeRef: ChangeDetectorRef
  ) {
    console.log("new dashboard");
    this.diseasesFacade.dispatch(setDiseaseStats({}));
  }


  ngOnInit(): void {
    console.log("dfsdfsdfsf");
     this.diseasesFacade.diseases$.subscribe(res => {
      console.log(res);
       this.dataSource.data = res;
       this.changeRef.markForCheck()
    });

    this.diseasesFacade.stats$.subscribe(res => {
      console.log(res);
      this.stats = res;
    });
    console.log(this);

/*    this.dataSource.paginator.page.subscribe(event => {
      console.log(event);
      this.paginationChanges(event);
    })*/
    this.dataSource.paginator = this.paginator;

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * change pages of list
   * @param event
   */
  paginationChanges(event: any) {
    navigationExtras.queryParams = {
      page: event.pageIndex + 1,
      rows: event.pageSize
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
