import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Disease} from "../../../../../../../models/gard/disease";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'ncats-frontend-library-data-panel',
  templateUrl: './data-panel.component.html',
  styleUrls: ['./data-panel.component.scss']
})
export class DataPanelComponent implements OnInit {

  @Input() field: string;

  @Input() object: Disease;


  @Input() data?: any;

  @Input() dataObservable?: Observable<any>;

  editing: string;

  returnObject: Disease;

  @Output() objectSet: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
    this.dataObservable.pipe(
      map(res => {
        console.log(res);
        this.data = res;
      })
    ).subscribe()
  }

  setCuratedObject(object, field): void {
    this.returnObject[field] = object;
  }

  setObject(field: string): void {
    this.object[field] = this.returnObject[field];
   // this.data = this.returnObject[field];
    this.editing = null;
    this.objectSet.emit(this.returnObject[field]);
  }
}
