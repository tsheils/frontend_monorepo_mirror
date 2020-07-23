import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {Disease} from "@ncats-frontend-library/models/gard/gard-models";
import {Router} from "@angular/router";
import {DiseasesFacade} from "@ncats-frontend-library/stores/diseases";

@Component({
  selector: 'ncats-frontend-library-data-table-panel',
  templateUrl: './data-table-panel.component.html',
  styleUrls: ['./data-table-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTablePanelComponent implements OnInit {

  @Input() field: any;
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
  }

  sortTable(event) {
  }

}
