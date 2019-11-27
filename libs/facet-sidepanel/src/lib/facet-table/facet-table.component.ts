import {Component, Input, OnInit} from '@angular/core';
import {Facet} from "../models/facet";

@Component({
  selector: 'ncats-fel-facet-table',
  templateUrl: './facet-table.component.html',
  styleUrls: ['./facet-table.component.scss']
})
export class FacetTableComponent implements OnInit {
  @Input()facet?: Facet;
  constructor() { }

  ngOnInit() {
  }

}
