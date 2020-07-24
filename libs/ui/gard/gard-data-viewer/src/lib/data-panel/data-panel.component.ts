import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {NavigationExtras, Router} from "@angular/router";
import {DiseasesFacade} from "@ncats-frontend-library/stores/diseases";
import {Disease} from "@ncats-frontend-library/models/gard/gard-models";

/**
 * navigation options to merge query parameters that are added on in navigation/query/facets/pagination
 */
const navigationExtras: NavigationExtras = {
  queryParamsHandling: 'merge'
};

@Component({
  selector: 'ncats-frontend-library-data-panel',
  templateUrl: './data-panel.component.html',
  styleUrls: ['./data-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataPanelComponent implements OnInit {

  @Input() field: {section: string, label?: string};
  @Input() data: any;

  editing: boolean;

  returnObject: Disease;

  // todo: does this need to be added?
  @Input() disease: Disease;

  @Output() dataChange: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private router : Router,
    private diseaseFacade: DiseasesFacade,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
   /* // todo unsubscribe on destroy
    this.diseaseFacade.selectedDisease$.subscribe(res=> {
      if(res && res.disease) {
        this.disease = res.disease;
       // this.data = this.disease.properties.get(this.field.section);
      }
    });*/
  //  this.changeDetectorRef.detectChanges();
  }

  setCuratedObject(object, field): void {
    this.returnObject[field] = object;
  }

  setObject(field: string): void {
    this.data = this.returnObject[field];
    this.editing = null;
    this.dataChange.emit(this.returnObject[field]);
  }

  edit(field: string) {
    this.editing = true;
    navigationExtras.queryParams = {
      edit: field
    };
    this.router.navigate([], navigationExtras);
  }
}
