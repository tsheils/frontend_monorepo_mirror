import {Hierarchy} from "@ncats-frontend-library/models/core/core-models";
import {Serializer} from "@ncats-frontend-library/models/interfaces/core-interfaces";

export class GardHierarchy extends Hierarchy {
  url?: string;
  dateCreated?: Date | number;
}

export class GardHierarchySerializer implements Serializer {

  constructor() {
  }

  fromJson(json: any): GardHierarchy {
      const obj = new GardHierarchy();
      Object.entries((json)).forEach((prop) => obj[prop[0]] = prop[1]);
      if (json.count && json.count.low) {
        obj.count = json.count.low;
      }

      if (json.children && json.children.length) {
        obj.children = json.children.map(child => this.fromJson(child));
      }
      return obj;
  }

  mergeChildren(parent: Hierarchy,  data: any): GardHierarchy {
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
        parent.children.map(child => this.mergeChildren(child, data));
      }
    }
    return parent;
  }
}
