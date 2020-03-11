import {Component, Input, OnInit} from '@angular/core';
import {GardDataProperty} from "../../../../../../models/gard/gard-base";

/**
 * component to display a property, primarily in a table
 */
@Component({
  selector: 'gard-data-display',
  templateUrl: './gard-data-display.component.html',
  styleUrls: ['./gard-data-display.component.scss']
})

export class GardDataDisplayComponent implements OnInit {
  /**
   * show the label/field name
   * @type {boolean}
   */
  @Input() showLabel = true;

  /**
   * property object being shown
   */
  @Input() property: GardDataProperty | GardDataProperty[];

  propertyType: string;
  constructor() {}

  ngOnInit() {
    if (Array.isArray(this.property)) {
      this.propertyType =  'array';
    } else if (this.property && this.property.propertyType) {
      this.propertyType = this.property.propertyType;
    }
  }
}
