import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Disease} from "@ncats-frontend-library/models/gard/gard-models";

@Component({
  selector: 'ncats-frontend-library-gard-disease-header',
  templateUrl: './gard-disease-header.component.html',
  styleUrls: ['./gard-disease-header.component.scss']
})
export class GardDiseaseHeaderComponent implements OnInit {
  /**
   * initialize a private variable _data, it's a BehaviorSubject
   * @type {BehaviorSubject<Disease>}
   * @private
   */
  protected _data = new BehaviorSubject<Disease>(null);

  /**
   * pushes changed data to {BehaviorSubject}
   * @param value
   */
  @Input()
  set data(value: any) {
    this._data.next(value);
  }

  /**
   * returns value of {BehaviorSubject}
   * @returns {any}
   */
  get data() {
    return this._data.getValue();
  }

  object: Disease;


  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this._data.subscribe(res=> {
      Object.keys(res).forEach( key => this[key] = res[key]);
      this.changeDetectorRef.markForCheck();
    })
  }


}
