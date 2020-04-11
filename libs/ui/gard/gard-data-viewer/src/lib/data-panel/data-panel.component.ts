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
import {BehaviorSubject, Observable} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'ncats-frontend-library-data-panel',
  templateUrl: './data-panel.component.html',
  styleUrls: ['./data-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataPanelComponent implements OnInit {

  @Input() fields: string[];

  @Input() object: Disease;

  /**
   * initialize a private variable _data, it's a BehaviorSubject
   * @type {BehaviorSubject<any>}
   * @private
   */
  protected _data = new BehaviorSubject<any>({});

  /**
   * pushes changed data to {BehaviorSubject}
   * @param value
   */
  @Input()
  set data(value: any) {
    if (value.data) {
      this._data.next(value.data);
    } else {
      this._data.next(value);
    }
  }

  /**
   * returns value of {BehaviorSubject}
   * @returns {any}
   */
  get data() {
    return this._data.getValue();
  }

  editing: string;

  returnObject: Disease;

  @Output() dataChange: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this._data.pipe(
      map(res=> {
         Object.keys(res).forEach( key => this[key] = res[key]);
        this.changeDetectorRef.markForCheck();
        }

      )
    ).subscribe()
  }

  setCuratedObject(object, field): void {
    this.returnObject[field] = object;
  }

  setObject(field: string): void {
    this.object[field] = this.returnObject[field];
    this.editing = null;
    this.dataChange.emit(this.returnObject[field]);
  }
}
