import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {OmimApiService, OmimParams} from "../../../../../../shared/services/src/lib/omim-api/omim-api.service";
import {DiseasesFacade} from "@ncats-frontend-library/stores/diseases";
import {Disease, GardDataProperty} from "@ncats-frontend-library/models/gard/gard-models";

@Component({
  selector: 'ncats-frontend-library-data-property-display',
  templateUrl: './data-property-display.component.html',
  styleUrls: ['./data-property-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataPropertyDisplayComponent implements OnInit {
  @Input() data: GardDataProperty;

  // todo: does this need to be added?
  @Input() disease: Disease;

  omimRefs: any[] = [];

  regex: RegExp = /(?<=\{)([0-9])\w+(?=\:)/g;
  constructor(
    private diseaseFacade: DiseasesFacade,
    private omimApiService: OmimApiService,
    private changeRef: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
            if(this.disease.omimCodes && (this.data)) {
              this.disease.omimCodes.forEach(code => {
                const params: OmimParams = {
                  omimId: code
                };
                this.omimApiService.fetch(params).subscribe(res=> {
                  const originalReferences = res.omim.entryList[0].entry.referenceList;
                  res.omim.entryList[0].entry.textSectionList.forEach(text => {
                    if(text.textSection.textSectionName ==='inheritance') {
                      Array.from(text.textSection.textSectionContent.matchAll(this.regex)).forEach(match => {
                       this.omimRefs.push(originalReferences[match[0]-1].reference);
                      });
                      this.changeRef.markForCheck();
                    }
                  });
                })
              })

            }
  }

  subType():string {
/*    if(this.data['source']) {
      return 'source'
    }*/
    if(this.data && (this.data.sources && this.data.references)) {
      return 'references';
    }
    if (this.data && this.data.sources) {
      return 'sources';
    } else if (this.data && this.data.references) {
      return 'references';
    } else {
      return null;
    }
  }
}
