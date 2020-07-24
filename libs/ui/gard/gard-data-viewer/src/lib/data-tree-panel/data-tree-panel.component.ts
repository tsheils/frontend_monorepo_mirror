import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {Router} from "@angular/router";
import {DiseasesFacade} from "@ncats-frontend-library/stores/diseases";
import {Disease} from "@ncats-frontend-library/models/gard/gard-models";

@Component({
  selector: 'ncats-frontend-library-data-tree-panel',
  templateUrl: './data-tree-panel.component.html',
  styleUrls: ['./data-tree-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTreePanelComponent implements OnInit {

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
  }

}
