import { Component, OnInit } from '@angular/core';
import {MatTreeNestedDataSource} from "@angular/material/tree";
import {NestedTreeControl} from "@angular/cdk/tree";

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FieldNode {
  name: string;
  children?: FieldNode[];
}

const TREE_DATA: FieldNode[] = [
  {
    name: 'Disease',
    children: [
      {name: 'Inheritance'},
      {name: 'Prevalence'},
      {name: 'Synonyms'},
    ]
  }/*, {
    name: 'Treatment',
    children: [
      {
        name: 'frequency',
      }, {
        name: 'type',
        children: [
          {name: 'Pumpkins'},
          {name: 'Carrots'},
        ]
      },*/
 //   ]
 // },
];

@Component({
  selector: 'ncats-frontend-library-object-tree',
  templateUrl: './object-tree.component.html',
  styleUrls: ['./object-tree.component.scss']
})
export class ObjectTreeComponent {
  treeControl = new NestedTreeControl<FieldNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<FieldNode>();

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: FieldNode) => !!node.children && node.children.length > 0;
}
