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

  selectField(event: MatCheckboxChange, name: string, field: string) {
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

    Array.from(this.mappedFieldsMap.entries())
      .forEach(source => {
        this.mappedFields.push({name: source[0], fields: source[1]});
      });
    this.mappedObjectChange.emit(this.mappedFieldsMap);
  }
}
