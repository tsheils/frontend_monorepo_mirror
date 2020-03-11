import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Disease} from "../../../../../../../models/gard/disease";

@Component({
  selector: 'ncats-frontend-library-data-panel',
  templateUrl: './data-panel.component.html',
  styleUrls: ['./data-panel.component.scss']
})
export class DataPanelComponent implements OnInit {

  @Input() field: string;

  @Input() object: Disease;

  @Input() data: any;

  editing: string;

  returnObject: Disease;

  @Output() objectSet: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  setCuratedObject(object, field): void {
    console.log(object);
    console.log(field);
    this.returnObject[field] = object;
  }

  setObject(field: string): void {
    console.log(field);
    this.object[field] = this.returnObject[field];
   // this.data = this.returnObject[field];
    this.editing = null;
    this.objectSet.emit(this.returnObject[field]);
  }
}
