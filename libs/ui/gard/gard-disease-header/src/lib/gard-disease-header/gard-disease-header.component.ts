import {Component, Input, OnInit} from '@angular/core';
import {Disease} from "../../../../../../../models/gard/disease";

@Component({
  selector: 'ncats-frontend-library-gard-disease-header',
  templateUrl: './gard-disease-header.component.html',
  styleUrls: ['./gard-disease-header.component.scss']
})
export class GardDiseaseHeaderComponent implements OnInit {

  @Input() data: Disease;

  constructor() { }

  ngOnInit(): void {
    console.log(this);
  }

}
