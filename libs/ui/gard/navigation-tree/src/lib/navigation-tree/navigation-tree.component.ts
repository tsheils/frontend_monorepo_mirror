import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {Neo4jConnectService} from "@ncats-frontend-library/shared/data-access/neo4j-connector";
import {QueueAction} from "rxjs/internal/scheduler/QueueAction";
import {BehaviorSubject} from "rxjs";
import {NavigationExtras, Router} from "@angular/router";
import {DiseasesFacade, fetchHierarchy} from "@ncats-frontend-library/stores/diseases";
import {GardHierarchy} from "@ncats-frontend-library/models/gard/gard-models";

/**
 * navigation options to merge query parameters that are added on in navigation/query/facets/pagination
 */
const navigationExtras: NavigationExtras = {
  queryParamsHandling: 'merge'
};

@Component({
  selector: 'ncats-frontend-library-navigation-tree',
  templateUrl: './navigation-tree.component.html',
  styleUrls: ['./navigation-tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationTreeComponent implements OnInit {

 @Input() data: GardHierarchy[];
  loading = false;

  callsMap: Map<string, any> = new Map<string, any>();

  constructor(
    private router: Router,
    private changeRef: ChangeDetectorRef,
    private connectionService: Neo4jConnectService,
    private diseasesFacade: DiseasesFacade
  ) { }

  ngOnInit(): void {
    this.diseasesFacade.dispatch(fetchHierarchy({node: {value: 'MONDO:0000001'}}));
    this.diseasesFacade.fetchHierarchy$.subscribe(res=> {
      if(res && res.children) {
        this.data = [res];
        this.loading = false;
        this.changeRef.markForCheck();
      }
    })
  }

  nodeClicked(node) {
    navigationExtras.queryParams = {
      parent: node.value
    };
    this._navigate(navigationExtras)
  }

  /**
   * navigate on changes, mainly just changes url, shouldn't reload entire page, just data
   * @param {NavigationExtras} navExtras
   * @private
   */
  private _navigate(navExtras: NavigationExtras): void {
    this.router.navigate([], navExtras);
  }

}
