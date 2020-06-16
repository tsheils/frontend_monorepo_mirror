import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {MatTreeNestedDataSource} from "@angular/material/tree";
import {NestedTreeControl} from "@angular/cdk/tree";
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
  console.log(value);
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
  fieldSelection = new SelectionModel<NestedNode>(true /* multiple */);

  constructor(
    private changeRef: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this._data.subscribe( res => {
      // this.dataSource.data = [];
      console.log(res);
       this.dataSource.data = this.data;
      this.treeControl.expansionModel.selected.reverse().forEach(node => this.treeControl.expandDescendants(node));
      this.changeRef.markForCheck();
    })
    this.treeControl.expand(this.dataSource.data[0]);
  }

  hasChild = (_: number, _nodeData: NestedNode) => _nodeData.count || (_nodeData.children && _nodeData.children.length > 1);

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
    this.fieldSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.fieldSelection.isSelected(node)
      ? this.fieldSelection.select(...descendants)
      : this.fieldSelection.deselect(...descendants);

    // Force update for the parent
    descendants.every(child =>
      this.fieldSelection.isSelected(child)
    );
    this.checkAllParentsSelection(node);
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  selectLeafNode(node: NestedNode): void {
   this.fieldSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }


  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: NestedNode): void {
    let parent: NestedNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

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

  /* Get the parent node of a node */
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
  }

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
