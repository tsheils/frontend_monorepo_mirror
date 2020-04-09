import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {moveItemInArray} from "@angular/cdk/drag-drop";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'ncats-frontend-library-curation-matrix',
  templateUrl: './curation-matrix.component.html',
  styleUrls: ['./curation-matrix.component.scss']
})
export class CurationMatrixComponent implements OnInit {

  @Input() field: string;
  @Input() editing = true;
  @Input() data: any[] = [];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  /**
   * selection model to track selected filters
   * @type {SelectionModel<string>}
   */
  filterSelection = new SelectionModel<any>(true, []);

  columns: string[] = [];

  displayColumns;

  selectedValues: any[] = [];

  @Input() sortingDataAccessor(item, property) {
    if (!item.references.includes(property)) {
      return item;
    }
  }

  @Output() curatedObjectChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
    console.log(this);
    if (this.data && this.field) {
      this.dataSource.data = this.data[this.field].sort((a, b) => {
        return b.references.length - a.references.length;
      });
      this.columns = [...new Set(this.columns.concat(...this.data[this.field].map(val => val.references)))].sort();
     if (this.editing) {
       this.displayColumns = ['display', 'value'].concat(this.columns);
     } else {
       this.displayColumns = ['value'].concat(this.columns);
     }
    }
    this.dataSource.paginator = this.paginator;

    if(this.sortingDataAccessor) {
      this.dataSource.sortingDataAccessor = this.sortingDataAccessor;
    }
    this.dataSource.sort = this.sort;


   this.filterSelection.select(...this.data[this.field].filter(row => row.preferred));

    this.filterSelection.changed.subscribe(change => {
      this.selectedValues = this.filterSelection.selected;
      this.curatedObjectChange.emit(this.selectedValues);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  drop(event) {
    moveItemInArray(this.selectedValues, event.previousIndex, event.currentIndex);
    this.curatedObjectChange.emit(this.selectedValues);
  }

  ngOnChanges(change) {
    console.log(change);
    if (change.data && this.data === null) {
    this.dataSource.data = [];
    } else if (change.data && this.data.length > 0) {
     this.dataSource.data = this.data.sort((a,b) => {
        return b.references.length - a.references.length;
      });
      this.filterSelection.select(...this.data[this.field].filter(row => row.preferred));
    }
  }


}
