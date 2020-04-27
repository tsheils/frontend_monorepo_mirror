import {Component, Input, OnInit} from '@angular/core';
import {Disease} from "../../../../../../../models/gard/disease";

@Component({
  selector: 'ncats-frontend-library-disease-list',
  templateUrl: './disease-list.component.html',
  styleUrls: ['./disease-list.component.scss']
})
export class DiseaseListComponent implements OnInit {
@Input() diseaseList: Disease[];
  constructor() { }

  ngOnInit(): void {
  }

}
