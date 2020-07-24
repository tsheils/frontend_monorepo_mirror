import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter, Injectable,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource} from "@angular/material/tree";
import {FlatTreeControl, NestedTreeControl} from "@angular/cdk/tree";
import {SelectionModel} from "@angular/cdk/collections";
import {BehaviorSubject} from "rxjs";
import {Hierarchy} from "@ncats-frontend-library/models/core/core-models";

/** Flat tree item node with expandable and level information */
export class HierarchyFlatNode extends Hierarchy {
  level: number;
  expandable: boolean;
}

@Component({
  selector: 'ncats-frontend-library-object-tree',
  templateUrl: './object-tree.component.html',
  styleUrls: ['./object-tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})

export class ObjectTreeComponent {
  @Output() fieldSelectChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() nodeExpandChange: EventEmitter<any> = new EventEmitter<any>();


  @Input() selectable = false;
  @Input() showLinks = false;
  @Input() dynamic = false;

  @Input() loading = false;


/**
  * initialize a private variable _data, it's a BehaviorSubject
* @type {BehaviorSubject<any>}
* @private
*/
protected _data = new BehaviorSubject<any>({});

/**
* pushes changed data to {BehaviorSubject}
* @param value
*/
@Input()
set data(value: any) {
  this._data.next(value);
}

/**
* returns value of {BehaviorSubject}
* @returns {any}
*/
get data() {
  return this._data.getValue();
}

/** The selection for checklist */
checklistSelection = new SelectionModel<HierarchyFlatNode>(true);

  private _transformer = (node: Hierarchy, level: number) => {
    const flatNode = new HierarchyFlatNode();
    Object.entries((node)).forEach((prop) => flatNode[prop[0]] = prop[1]);
   // flatNode.value = node.value;
   // flatNode.label = node.label;
    flatNode.expandable = (!!node.children && node.children.length > 0) ||  (!!node.count && node.count > 0);
      flatNode.level = level;
    return flatNode;
  };

  treeControl = new FlatTreeControl<HierarchyFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

constructor(
  private changeRef: ChangeDetectorRef
) {
}

  ngOnInit() {
    this._data.subscribe( res => {
      if(res && res.length) {
        this.dataSource.data = res;
        this.dataSource._flattenedData.subscribe(data => {
          this.treeControl.dataNodes = data;
          this.treeControl.expansionModel.selected.forEach(node => {
            const n = this.treeControl.dataNodes.find(d => d.value === node.value);
            if(n) {
              this.treeControl.expand(n);
            }
          });
        });

        this.treeControl.expand(this.treeControl.dataNodes[0]);
        this.changeRef.markForCheck();
      }
    });

  }

  hasChild = (_: number, _nodeData: HierarchyFlatNode) => _nodeData.expandable;

/** Whether all the descendants of the node are selected. */
descendantsAllSelected(node: HierarchyFlatNode): boolean {
  const descendants = this.treeControl.getDescendants(node);
  const descAllSelected = descendants.every(child =>
    this.checklistSelection.isSelected(child)
  );
  return descAllSelected;
}

/** Whether part of the descendants are selected */
descendantsPartiallySelected(node: HierarchyFlatNode): boolean {
  const descendants = this.treeControl.getDescendants(node);
  const result = descendants.some(child => this.checklistSelection.isSelected(child));
  return result && !this.descendantsAllSelected(node);
}

/** Toggle the to-do item selection. Select/deselect all the descendants node */
todoItemSelectionToggle(node: HierarchyFlatNode): void {
  this.checklistSelection.toggle(node);
const descendants = this.treeControl.getDescendants(node);
this.checklistSelection.isSelected(node)
  ? this.checklistSelection.select(...descendants)
  : this.checklistSelection.deselect(...descendants);

// Force update for the parent
descendants.every(child =>
  this.checklistSelection.isSelected(child)
);
this.checkAllParentsSelection(node);
}

/** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
todoLeafItemSelectionToggle(node: HierarchyFlatNode): void {
  this.checklistSelection.toggle(node);
this.checkAllParentsSelection(node);
}

/* Checks all the parents when a leaf node is selected/unselected */
checkAllParentsSelection(node: HierarchyFlatNode): void {
  let parent: HierarchyFlatNode | null = this.getParentNode(node);
while (parent) {
  this.checkRootNodeSelection(parent);
  parent = this.getParentNode(parent);
}
}

/** Check root node checked state and change it accordingly */
checkRootNodeSelection(node: HierarchyFlatNode): void {
  const nodeSelected = this.checklistSelection.isSelected(node);
const descendants = this.treeControl.getDescendants(node);
const descAllSelected = descendants.every(child =>
  this.checklistSelection.isSelected(child)
);
if (nodeSelected && !descAllSelected) {
  this.checklistSelection.deselect(node);
} else if (!nodeSelected && descAllSelected) {
  this.checklistSelection.select(node);
}
}

/* Get the parent node of a node */
getParentNode(node: HierarchyFlatNode): HierarchyFlatNode | null {
  const currentLevel = node.level;

  if (currentLevel < 1) {
    return null;
  }

  const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

  for (let i = startIndex; i >= 0; i--) {
    const currentNode = this.treeControl.dataNodes[i];

    if (currentNode.level < currentLevel) {
      return currentNode;
    }
  }
  return null;
}

  fetchData(node: Hierarchy) {
    if(this.dynamic  && !node.children) {
      this.nodeExpandChange.emit(node);
    }
  }

  fetchLeafData(node: Hierarchy) {
    if(this.dynamic && !node.children) {
      this.nodeExpandChange.emit(node);
    }
  }
}
