import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {CdkDrag, copyArrayItem, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {SelectionModel} from "@angular/cdk/collections";
import {MatCheckboxChange} from "@angular/material/checkbox";

@Component({
  selector: 'ncats-frontend-library-mapper-interface',
  templateUrl: './mapper-interface.component.html',
  styleUrls: ['./mapper-interface.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MapperInterfaceComponent implements OnInit {
  @Input() allSourcesLoading = false;
  @Input() options: any[] = [];
  @Input() mapped: any[] = [];
  @Input() searchTerm: string;
  @Input() mappedFieldsMap: Map<string, string[]> = new Map<string, string[]>();
  @Input() mappedFields: any[] = [];
  @Output() mappedObjectChange: EventEmitter<any> = new EventEmitter<any>();

  selection = new SelectionModel<any>(true, []);

  constructor() {
  }

  ngOnInit(): void {
  }

/*  drop(event) {
    console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

    }
    console.log(this.mapped);
    this.mappedObjectChange.emit(this.mapped);
  }

  dropField(event) {
    console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      copyArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    console.log(event.data);
    console.log(this.mappedFields);
    this.mappedObjectChange.emit(this.mapped);
  }

  remove(event: any, item: any) {
    this.mappedFieldsMap.delete(item);
  }

  /!** Predicate function that only allows fields without a name property to be dropped into a list. *!/
  noSourcePredicate(item: CdkDrag<any>) {
    console.log(item);
    console.log(item.data);
    return !item.data.name;
  }

  /!** Predicate function that only allows fields with a name property to be dropped into a list. *!/
  sourcePredicate(item: CdkDrag<any>) {
    return item.data.name;
  }

  dragStarrt(event, item) {
    console.log(event);
    console.log(item);
  }*/

  selectField(event: MatCheckboxChange, name: string, field: string) {
    console.log(event);
    console.log(name);
    console.log(field);
    console.log(this.mappedFields);
    this.mappedFields = [];
    const fieldName = this.mappedFields.filter(field => field.name === name);
    if (this.mappedFieldsMap.has(name)) {
      let fields = this.mappedFieldsMap.get(name);
      if (event.checked) {
        fields.push(field);
      } else {
        fields = fields.filter(selfield => selfield !== field);
      }
      if (fields.length > 0) {
        this.mappedFieldsMap.set(name, fields);
      } else {
        this.mappedFieldsMap.delete(name);
      }
    } else {
      this.mappedFieldsMap.set(name, [field]);
    }

    /*if(fieldName.length > 0) {
      this.mappedFields.map(field=> {
        console.log(field);
        if(field.name === name) {
          field.fields.push(field);
        }
        return true;
      });
    } else {
      this.mappedFields.push({name:name, fields: [field]})
    }*/
    Array.from(this.mappedFieldsMap.entries())
      .forEach(source => {
        this.mappedFields.push({name: source[0], fields: source[1]});
      });

    this.mappedObjectChange.emit(this.mappedFieldsMap);

  }

}
