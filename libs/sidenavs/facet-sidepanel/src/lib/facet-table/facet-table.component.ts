import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Facet, Field} from "../models/facet";
import {Subject} from "rxjs";
import {SelectionModel} from "@angular/cdk/collections";
import { MatTableDataSource } from "@angular/material/table";
import {takeUntil} from "rxjs/internal/operators";

@Component({
  selector: 'fel-facet-table',
  templateUrl: './facet-table.component.html',
  styleUrls: ['./facet-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FacetTableComponent implements OnInit, OnDestroy {
  /**
   * facet to display fields of
   */
  @Input() facet: Facet;

  /**
   * data source of filters to display in the table
   * @type {MatTableDataSource<any>}
   */
  dataSource = new MatTableDataSource<Field>([]);

  /**
   * selection model to track selected filters
   * @type {SelectionModel<string>}
   */
  filterSelection = new SelectionModel<string>(true, []);

  /**
   * facet selection fields to display
   * @type {string[]}
   */
  displayColumns: string [] = ['select', 'name', 'value'];
  /**
   *object fields headings to track and show
   * @type {string[]}
   */
  fieldColumns: string [] = ['name', 'value'];

  /**
   * unsubscribe subject
   * @type {Subject<any>}
   */
  private ngUnsubscribe: Subject<any> = new Subject();

  constructor() { }

  ngOnInit() {
    if (this.facet && this.facet.values) {
      this.facet.values.forEach(value => value.selected === true ? this.filterSelection.select(value.name) : null);
      this.dataSource.data = this.facet.values;
    }
    this.filterSelection.changed
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(change => {
        console.log(change);
        // todo add event emitter
      });
  }

  /**
   * track facet changes to avoid unnecessary changes
   * @param index
   * @param {Field} item
   * @returns {string}
   */
  trackByFunction(index, item: Field) {
    return item.name;
  }

  /**
   * filter facets by query
   * todo implement this
   * @param {string} q
   */
  filterFacet(q: string): void {
    // console.log(q);
  }


  /**
   * function to unubscribe on destroy
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
