import { Component, OnInit } from '@angular/core';
import {DataSource} from "@angular/cdk/table";
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {moveItemInArray} from "@angular/cdk/drag-drop";

@Component({
  selector: 'ncats-frontend-library-curation-matrix',
  templateUrl: './curation-matrix.component.html',
  styleUrls: ['./curation-matrix.component.scss']
})
export class CurationMatrixComponent implements OnInit {

  testdata = [
    {value: 'synonym1', references: ['ref1', 'ref2', 'ref3', 'ref4']},
    {value: 'synonym2', references: ['ref1', 'ref12', 'ref13', 'ref4']},
    {value: 'synonym3', references: ['ref6', 'ref4', 'ref3', 'ref5']},
    {value: 'synonym4', references: ['ref1', 'ref2', 'ref8', 'ref9']},
    {value: 'synonym5', references: ['ref1', 'ref2', 'ref3', 'ref4']},
    {value: 'synonym6', references: ['ref9', 'ref6', 'ref10', 'ref4']},
    {value: 'synonym7', references: ['ref10', 'ref12', 'ref13']},
    {value: 'synonym8', references: ['ref1']},
    {value: 'synonym80', references: []},
    {value: 'synonym9', references: ['ref1', 'ref2', 'ref3', 'ref4', 'ref5', 'ref6', 'ref7', 'ref8', 'ref9', 'ref10', 'ref11', 'ref12', 'ref13', 'ref14']},
    {value: 'synonym10', references: ['ref10', 'ref12', 'ref13', 'ref14']}
  ];

  data: MatTableDataSource <any> = new MatTableDataSource(this.testdata);

  /**
   * selection model to track selected filters
   * @type {SelectionModel<string>}
   */
  filterSelection = new SelectionModel<any>(true, []);

  columns: string[] = [];

  displayColumns;

  selectedValues: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.columns = [...new Set(this.columns.concat(...this.testdata.map(val => val.references)))].sort();
    this.displayColumns = ['display', 'value'].concat(this.columns);
    console.log(this);

    this.filterSelection.changed.subscribe(change => {
      this.selectedValues = this.filterSelection.selected;
    })
  }

  drop(event) {
    console.log(event);
    moveItemInArray(this.selectedValues, event.previousIndex, event.currentIndex);
   // this.data.data = this.testdata;
  //  this.selectedValues = this.filterSelection.selected;
  }
}
