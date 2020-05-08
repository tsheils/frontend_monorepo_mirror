import {Component, Input, OnInit} from '@angular/core';
import {Disease} from "../../../../../../../models/gard/disease";
import {NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'ncats-frontend-library-disease-list-card',
  templateUrl: './disease-list-card.component.html',
  styleUrls: ['./disease-list-card.component.scss']
})
export class DiseaseListCardComponent implements OnInit {

  @Input() disease: Disease;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log(this);
  }

  navigate(id: string): void {
   const navigationExtras: NavigationExtras = {
     queryParams:{
       disease: id
     }
   };
    this.router.navigate(['/curation'], navigationExtras);
  }
}
