import {Component, Input, OnInit} from '@angular/core';
import {NavigationExtras, Router} from "@angular/router";
import {Disease} from "@ncats-frontend-library/models/gard/gard-models";

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
