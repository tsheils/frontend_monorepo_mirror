import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {Disease} from "../../../../../../../models/gard/disease";
import {Observable} from "rxjs";

@Component({
  selector: 'ncats-frontend-library-data-panel',
  templateUrl: './data-panel.component.html',
  styleUrls: ['./data-panel.component.scss'],
 // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataPanelComponent implements OnInit {

  @Input() fields: string[];

  @Input() object: Disease;


  @Input() data?: any;

 // @Input() dataObservable: Observable<any>;

  editing: string;

  returnObject: Disease;

  @Output() dataChange: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnChanges(change) {
    console.log(change);
    if(change.data) {
      console.log(this.data);
      Object.entries(this.data).forEach((value, key) => this[key] = value);
      this.changeDetectorRef.detectChanges();
    }
  }

  ngOnInit(): void {
    console.log(this);
    if(this.data) {
      console.log(this.data);
      Object.entries(this.data).forEach((value, key) => this[key] = value);
      this.changeDetectorRef.detectChanges();
    }

    /* this.dataObservable.pipe(
       map(res => {
         console.log(res);
         if(res) {
           Object.keys(res).forEach(key => this[key] = res[key]);
         }
       })
     ).subscribe()*/
  }

  setData(data: any) {
    console.log(this.data);
    Object.keys(data).forEach( key => this[key] = data[key]);
  }

  setCuratedObject(object, field): void {
    this.returnObject[field] = object;
  }

  setObject(field: string): void {
    this.object[field] = this.returnObject[field];
   // this.data = this.returnObject[field];
    this.editing = null;
    this.dataChange.emit(this.returnObject[field]);
  }
}
