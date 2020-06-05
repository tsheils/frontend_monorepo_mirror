import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Neo4jConnectService} from "@ncats-frontend-library/shared/data-access/neo4j-connector";

@Component({
  selector: 'ncats-frontend-library-navigation-tree',
  templateUrl: './navigation-tree.component.html',
  styleUrls: ['./navigation-tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationTreeComponent implements OnInit {

 @Input() data: any;

  constructor(
    private changeRef: ChangeDetectorRef,
    private connectionService: Neo4jConnectService
  ) { }

  ngOnInit(): void {
    this.fetchLevel({value: 'http://www.orpha.net/ORDO/Orphanet_C001'})
  }

fetchLevel(node:any) {
  const call = `
match p=(e:HierarchyNode)-[:IsAParent]->(h:HierarchyNode)
where e.value = {payload} with distinct h, e, p
match p2=(h)-[:IsAParent]->(r) with count(p2) as count, properties(h) as props, e, p
order by count DESC
with e{.*, count: count(p), children: collect(props{.*, count: count})} as data
return data
    `;
  this.connectionService.read('gard-data', call, {payload: node.value}).subscribe(res => {
    if(res.data) {
      this.data = res.data;
      this.data.count = res.data.count.low;
      this.data.children = res.data.children.map(child => {
        child.count = child.count.low;
        return child;
      });
      this.changeRef.markForCheck();
    }
  })
}

}
