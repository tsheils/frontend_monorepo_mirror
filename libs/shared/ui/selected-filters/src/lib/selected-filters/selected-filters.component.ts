import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {DiseasesFacade} from "@ncats-frontend-library/stores/diseases";
import {Router} from "@angular/router";

@Component({
  selector: 'ncats-frontend-library-selected-filters',
  templateUrl: './selected-filters.component.html',
  styleUrls: ['./selected-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectedFiltersComponent implements OnInit {
  /**
   * list of selected filters
   */
//  @Input() filters: Facet[];
  @Input() filters: any[];

  queryParameters: any;

  /**
   * set up route watching
   * @param router
   * @param changeRef
   * @param diseaseFacade
   */
  constructor(
              private router: Router,
              private changeRef: ChangeDetectorRef,
              private diseaseFacade: DiseasesFacade
              ) {
  }

  /**
   * set up subscriptions for fetching facets and watching route changes
   */
  ngOnInit() {
    this.diseaseFacade.filters$.subscribe(res => {
      this.queryParameters = res;
      this.filters = Object.entries(res).map(entry => ({label: entry[0], values:[{name: entry[1]}]}));
      this.changeRef.markForCheck();
    });
    /*this.router.events
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((e: any) => {
        // If it is a NavigationEnd event re-initalize the component
        if (e instanceof NavigationEnd) {
          this.facets = this.selectedFacetService.getFacetsAsObjects();
          this.changeRef.markForCheck();
        }
      });
    this.facets = this.selectedFacetService.getFacetsAsObjects();
    this.changeRef.markForCheck();*/
  }

  /**
   * remove a specific facet and all selected fields
   * @param facet
   */
  removefacetFamily(facet: any): void {
    /*this.selectedFacetService.removefacetFamily(facet);
    const queryParams = this.selectedFacetService.getFacetsAsUrlStrings();*/
   // this.pathResolverService.navigate(queryParams, this._route, this.selectedFacetService.getPseudoFacets());
  }

  /**
   * remove single field from a facet
   * @param facet
   * @param {string} field
   */
  removeField(facet: string, field: string): void {
/*    this.selectedFacetService.removeField(facet, field);
    const queryParams = this.selectedFacetService.getFacetsAsUrlStrings();
    this.pathResolverService.navigate(queryParams, this._route, this.selectedFacetService.getPseudoFacets());*/
  }

  /**
   * clear all queries/facets
   */
  removeAll(): void {
   /* this.selectedFacetService.clearFacets();
    const queryParams = this.selectedFacetService.getFacetsAsUrlStrings();
    this.pathResolverService.navigate(queryParams, this._route);*/
  }

  ngOnDestroy(): void {
   /* this.facets = [];
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();*/
  }
}
