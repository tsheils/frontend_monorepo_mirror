import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ncats-frontend-library-data-accordion-panel',
  templateUrl: './data-accordion-panel.component.html',
  styleUrls: ['./data-accordion-panel.component.scss']
})
export class DataAccordionPanelComponent implements OnInit {
  @Input() field: any;
  @Input() data: any;


  constructor() { }

  ngOnInit(): void {
  }

}
