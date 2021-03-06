import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {map} from "rxjs/operators";
import {BehaviorSubject} from "rxjs";
import {Disease} from "@ncats-frontend-library/models/gard/gard-models";

@Component({
  selector: 'ncats-frontend-library-data-panel-list',
  templateUrl: './data-panel-list.component.html',
  styleUrls: ['./data-panel-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataPanelListComponent implements OnInit {

  @Input() fields: any;

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

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this._data.pipe(
      map(res => {
        if (res) {
          Object.keys(this.data).forEach(key => this[key] = res[key]);
          this.changeDetectorRef.markForCheck();
        }
        }
      )
    ).subscribe()
  }
}
