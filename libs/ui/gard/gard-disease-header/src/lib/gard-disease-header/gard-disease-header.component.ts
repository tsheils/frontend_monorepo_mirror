import {Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Disease} from "../../../../../../../models/gard/disease";

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
  set data(value: Disease) {
    this._data.next(value);
  }

  /**
   * returns value of {BehaviorSubject}
   * @returns {Disease}
   */
  get data() {
    return this._data.getValue();
  }


  constructor() { }

  ngOnInit(): void {
  }


}
