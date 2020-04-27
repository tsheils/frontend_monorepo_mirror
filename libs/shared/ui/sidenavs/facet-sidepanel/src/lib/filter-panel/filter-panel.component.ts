import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Facet} from "../models/facet";
import {Subject} from "rxjs";

@Component({
  selector: 'ncats-frontend-library-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterPanelComponent implements OnInit, OnDestroy {
  panelOptions: any = {
    mode : 'side',
    class : 'filters-panel',
    opened: true,
    fixedInViewport: true,
    fixedTopGap: 70,
    role: 'directory'
    /* [mode]="isSmallScreen!==true ? 'side' : 'over'"
     [opened]="isSmallScreen !== true"*/
  };

  /**
   * close the filter panel
   * @type {EventEmitter<boolean>}
   */
  @Output() menuToggle: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * show all facets event emitter
   * @type {EventEmitter<boolean>}
   */
  @Output() showAllToggle: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * list of facets shown in the filter panel
   */
  @Input() facets: Facet[];

  /**
   * boolean to expand facet panel width
   * @type {boolean}
   */
  @Input() expandable = false;

  /**
   * show all facets boolean
   * @type {boolean}
   */
  fullWidth = false;

  /**
   * ngmodel of search value to filter facets when all are displayed
   */
  value: string;

  /**
   * boolean to track if facets are loading/shown
   * @type {boolean}
   */
  loading = false;

  /**
   * subject to unsubscribe on destroy
   * @type {Subject<any>}
   */
  private ngUnsubscribe: Subject<any> = new Subject();

  constructor() { }

  ngOnInit() {
  }

  /**
   * toggle the show all facets view
   * load all facets as needed
   */
  toggleFacets() {
    this.fullWidth = !this.fullWidth;
    if (this.fullWidth) {
      this.panelOptions.mode = 'over';
      this.loading = true;
/*      if (!this.allFacets || this.allFacets.length === 0) {
        this.pharosApiService.getAllFacets(
          this._route.snapshot.data.path,
          this._route.snapshot.queryParamMap,
          this._route.snapshot.data.fragments).valueChanges.subscribe(res => {
          this.allFacets = res.data.results.facets;
          this.loading = false;
          this.facets = this.allFacets;
          this.changeRef.markForCheck();
        });
      }*/
    } else {
      this.panelOptions.mode = 'side';
    //  this.facets = this.filteredFacets;
      this.loading = false;
    }
  }

  /**
   * search an filter facets
   * @param {string} term
   */
  search(term: string): void {
/*    this.facets = this.allFacets.filter(facet => {
      return JSON.stringify(facet).toLowerCase().includes(term.toLowerCase());
    });*/
  }

  /**
   * clear the all facets filter search
   */
  clear(): void {
    this.value = '';
 //   this.facets = this.allFacets;
  }

  /**
   * remove all selected facets
   */
  removeAll(): void {
/*    this.selectedFacetService.clearFacets();
    const queryParams = this.selectedFacetService.getFacetsAsUrlStrings();
    this.pathResolverService.navigate(queryParams);*/
  }


  /**
   * function to track facet object to avoid reloading if the facet doesn't change
   * @param {string} index
   * @param {Facet} item
   * @returns {Facet}
   */
  trackByFn(index: string, item: Facet) {
    return item.facet;
  }

  /**
   * close the filter panel
   */
  toggleMenu() {
    this.menuToggle.emit();
  }

  /**
   * function to unsubscribe on destroy
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
