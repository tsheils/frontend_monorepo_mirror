import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource} from "@angular/material/tree";
import {FlatTreeControl, NestedTreeControl} from "@angular/cdk/tree";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {SelectionModel} from "@angular/cdk/collections";

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FieldNode {
  field: string;
  children?: FieldNode[];
}

/** Flat to-do item node with expandable and level information */
export class FieldFlatNode {
  field: string;
  level: number;
  expandable: boolean;
}

const TREE_DATA: FieldNode[] = [
  {
    field: 'Disease',
    children: [
      {field: 'Inheritance'},
      {field: 'Prevalence'},
      {field: 'Synonyms'},
    ]
  }
];


@Component({
  selector: 'ncats-frontend-library-object-tree',
  templateUrl: './object-tree.component.html',
  styleUrls: ['./object-tree.component.scss']
})
export class ObjectTreeComponent {
  @Output() fieldSelectChange: EventEmitter<any> = new EventEmitter<any>();


  @Input() selectable = false;
  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<FieldFlatNode, FieldNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<FieldNode, FieldFlatNode>();

  /** A selected parent node to be inserted */
  selectedParent: FieldFlatNode | null = null;

  /** The new item's name */
  newItemName = '';

  treeControl: FlatTreeControl<FieldFlatNode>;

  treeFlattener: MatTreeFlattener<FieldNode, FieldFlatNode>;


  dataSource = new MatTreeNestedDataSource<FieldNode>();
  fieldSelection = new SelectionModel<FieldNode>(false /* multiple */);

  constructor() {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
      this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<FieldFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

      this.dataSource.data = TREE_DATA;
  }

  getLevel = (node: FieldFlatNode) => node.level;

  isExpandable = (node: FieldFlatNode) => node.expandable;

  getChildren = (node: FieldNode): FieldNode[] => node.children;

  hasChild = (_: number, _nodeData: FieldFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: FieldFlatNode) => _nodeData.field === '';

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: FieldNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.field === node.field
      ? existingNode
      : new FieldFlatNode();
    flatNode.field = node.field;
    flatNode.level = level;
    flatNode.expandable = !!node.children;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: FieldFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.fieldSelection.isSelected(child)
    );
    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: FieldFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.fieldSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  selectParentNode(node: FieldFlatNode): void {
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
  selectLeafNode(node: FieldFlatNode): void {
    this.fieldSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: FieldFlatNode): void {
    let parent: FieldFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: FieldFlatNode): void {
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
  getParentNode(node: FieldFlatNode): FieldFlatNode | null {
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

}
