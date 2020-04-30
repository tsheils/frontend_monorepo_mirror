import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Disease} from "../../../../../../../models/gard/disease";
import {DiseasesFacade} from "@ncats-frontend-library/stores/diseases";
import {GardDataProperty} from "../../../../../../../models/gard/gard-base";
import {OmimApiService, OmimParams} from "../../../../../../shared/services/src/lib/omim-api/omim-api.service";

@Component({
  selector: 'ncats-frontend-library-reference-display',
  templateUrl: './reference-display.component.html',
  styleUrls: ['./reference-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReferenceDisplayComponent implements OnInit {
@Input() reference: GardDataProperty;
@Input() disease: Disease;

omimRefs: any[] = [];

regex: RegExp = /(?<=\{)([0-9])\w+(?=\:)/g;
  constructor(
    private diseaseFacade: DiseasesFacade,
    private omimApiService: OmimApiService,
    private changeRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    console.log(this);
    this.diseaseFacade.selectedDisease$.subscribe(res=> {
      this.disease = res.disease;
      if(this.disease.omimCodes && this.reference.reference === 'OMIM') {
        console.log("has omim");
        this.disease.omimCodes.forEach(code => {
          const params: OmimParams = {
            omimId: code
          };
          this.omimApiService.fetch(params).subscribe(res=> {
            console.log(res);
            const originalReferences = res.omim.entryList[0].entry.referenceList;
            res.omim.entryList[0].entry.textSectionList.forEach(text => {
              console.log(text);
              if(text.textSection.textSectionName ==='inheritance') {
                console.log(text.textSection);
                Array.from(text.textSection.textSectionContent.matchAll(this.regex)).forEach(match => {
                  console.log(match)
;                  this.omimRefs.push(originalReferences[match[0]-1].reference);
                })
                this.changeRef.markForCheck();
                console.log(this);
              }
            });
          })
        })

      }
    })
  }

}
