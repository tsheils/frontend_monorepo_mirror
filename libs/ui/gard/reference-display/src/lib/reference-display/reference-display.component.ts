import {Component, Input, OnInit} from '@angular/core';
import {GardReference} from "../../../../../../../models/gard/gard-reference";
import {Disease} from "../../../../../../../models/gard/disease";
import {DiseasesFacade} from "@ncats-frontend-library/stores/diseases";
import {HttpClient} from "@angular/common/http";
import {GardDataProperty} from "../../../../../../../models/gard/gard-base";
import {OmimApiService, OmimParams} from "../../../../../../shared/services/src/lib/omim-api/omim-api.service";

@Component({
  selector: 'ncats-frontend-library-reference-display',
  templateUrl: './reference-display.component.html',
  styleUrls: ['./reference-display.component.scss']
})
export class ReferenceDisplayComponent implements OnInit {
@Input() reference: GardDataProperty;
@Input() disease: Disease;

  constructor(
    private diseaseFacace: DiseasesFacade,
    private omimApiService: OmimApiService
  ) { }

  ngOnInit(): void {
    console.log(this);
    this.diseaseFacace.selectedDisease$.subscribe(res=> {
      this.disease = res.disease;
      if(this.disease.omimCodes && this.reference.reference === 'OMIM') {
        console.log("has omim");
        this.disease.omimCodes.forEach(code => {
          const params: OmimParams = {
            omimId: code
          };
          this.omimApiService.fetch(params).subscribe(res=> {
            console.log(res);
          })
        })

      }
    })
  }

}
