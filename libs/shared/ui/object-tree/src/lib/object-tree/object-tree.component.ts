import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource} from "@angular/material/tree";
import {FlatTreeControl, NestedTreeControl} from "@angular/cdk/tree";
import {SelectionModel} from "@angular/cdk/collections";
import {BehaviorSubject} from "rxjs";

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface NestedNode {
  label: string;
  value?: string;
  url?: string;
  count?: number;
  children?: NestedNode[];
}

/** Flat to-do item node with expandable and level information
export class FieldFlatNode {
  label: string;
  level: number;
  value?: string;
  url?: string;
  count?: number;
  expandable: boolean;
}*/

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

  // @Input() data: FieldNode;

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

  treeControl = new NestedTreeControl<NestedNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<NestedNode>();



 // dataSource = new MatTreeNestedDataSource<FieldNode>();
  fieldSelection = new SelectionModel<NestedNode>(false /* multiple */);

  constructor(
    private changeRef: ChangeDetectorRef
  ) {
 //   this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
  //    this.isExpandable, this.getChildren);
  //  this.treeControl = new FlatTreeControl<NestedNode>(this.getLevel, this.isExpandable);
 //   this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
 //   this.dataSource.data = TREE_DATA;
  }

  ngOnInit() {
    this._data.subscribe( res => {
       this.dataSource.data = [];
       this.dataSource.data = this.data;
      this.changeRef.markForCheck();
    })
    this.treeControl.expand(this.dataSource.data[0]);
  }

  /*getLevel = (node: FieldFlatNode) => node.level;

  isExpandable = (node: FieldFlatNode) => node.expandable;

  getChildren = (node: FieldNode): FieldNode[] => {
  //  console.log(node);
    return node.children;
  }*/

  hasChild = (_: number, _nodeData: NestedNode) => _nodeData.count || (_nodeData.children && _nodeData.children.length > 1);

 // hasNoContent = (_: number, _nodeData: FieldFlatNode) => _nodeData.label === '';

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
/*
  transformer = (node: FieldNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.label === node.label
      ? existingNode
      : new FieldFlatNode();
    flatNode.label = node.label;
    flatNode.url = node.url;
    flatNode.level = level;
    flatNode.value = node.value;
    flatNode.count = node.count;
    flatNode.expandable = !!node.children || node.count > 0;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }
*/

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: NestedNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>  this.fieldSelection.isSelected(child)
    );
    return false // descAllSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: NestedNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.fieldSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  selectParentNode(node: NestedNode): void {
   // this.fieldSelection.toggle(node);
/*    const descendants = this.treeControl.getDescendants(node);
    this.fieldSelection.isSelected(node)
      ? this.fieldSelection.select(...descendants)
      : this.fieldSelection.deselect(...descendants);

    // Force update for the parent
    descendants.every(child =>
      this.fieldSelection.isSelected(child)
    );
    this.checkAllParentsSelection(node);*/
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  selectLeafNode(node: NestedNode): void {
 //   this.fieldSelection.toggle(node);
 //   this.checkAllParentsSelection(node);
  }
/*
  /!* Checks all the parents when a leaf node is selected/unselected *!/
  checkAllParentsSelection(node: NestedNode): void {
    let parent: NestedNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }*/

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: NestedNode): void {
    const nodeSelected = this.fieldSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
       this.fieldSelection.isSelected(child)
    );
    if (nodeSelected && !descAllSelected) {
      this.fieldSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.fieldSelection.select(node);
    }
    this.fieldSelectChange.emit(this.fieldSelection.selected);
  }

/*  /!* Get the parent node of a node *!/
  getParentNode(node: NestedNode): NestedNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }*/

  fetchData(node: NestedNode) {
    if(this.dynamic) {
      this.nodeExpandChange.emit(node);
    }
  }

  fetchLeafData(node: NestedNode) {
    if(this.dynamic) {
      this.nodeExpandChange.emit(node);
    }
  }
}
