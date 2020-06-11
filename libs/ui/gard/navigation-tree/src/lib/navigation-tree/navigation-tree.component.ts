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

@Component({
  selector: 'ncats-frontend-library-navigation-tree',
  templateUrl: './navigation-tree.component.html',
  styleUrls: ['./navigation-tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationTreeComponent implements OnInit {

 @Input() data: any;
  loading = false;

  callsMap: Map<string, any> = new Map<string, any>();

  constructor(
    private changeRef: ChangeDetectorRef,
    private connectionService: Neo4jConnectService
  ) { }

  ngOnInit(): void {
    this.fetchLevel({value: 'MONDO:0000001'})
  }

fetchLevel(node) {
  if (!this.callsMap.has(node.value)) {
    const call = `
match p=(e:HierarchyNode)-[:IsAParent]->(h:HierarchyNode)
where e.value = {payload} with distinct h, e, p
match p2=(h)-[:IsAParent]->(r) with count(p2) as count, properties(h) as props, e, p
order by count DESC
with e{.*, count: count(p), children: collect(props{.*, count: count})} as data
return data
    `;
    this.connectionService.read('gard-data', call, {payload: node.value}).subscribe(res => {
      if (res.data) {
        let tempArr: any;
        node = res.data;
        node.count = node.count.low;
        node.children = res.data.children.map(child => {
          child.count = child.count.low;
          return child;
        });
        tempArr = node;
        if (this.data && this.data.length > 0) {
          tempArr = Object.assign(this.data[0], {});
        }
          this.data = [this.setTreeData(tempArr, node)];
        console.log(this.data);
        this.changeRef.markForCheck();
        this.loading = false;
        this.callsMap.set(node.value, true);
        this.changeRef.markForCheck();
      }
    })
  }
}

setTreeData(parent, data) {
    if (parent.value === data.value) {
      parent = data;
    } else if (parent.children) {
      let found = false;
      parent.children.map(child => {
        if(child.value === data.value) {
          child.children = data.children;
          found = true;
        }
        return child;
      });
      if(found){
        return parent;
      } else {
        parent.children.map(child => this.setTreeData(child, data));
      }
    }
    return parent;
  }
 }
