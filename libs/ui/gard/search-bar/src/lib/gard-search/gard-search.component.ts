import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {debounceTime, distinctUntilChanged, finalize, switchMap, zipAll} from "rxjs/operators";
import {BehaviorSubject, Observable, of} from "rxjs";
import {Neo4jConnectService} from "@ncats-frontend-library/common/data-access/neo4j-connector";
import {DiseaseSerializer} from "../../../../../../../models/gard/disease";
import {FormControl} from "@angular/forms";
import {MatAutocompleteSelectedEvent, MatAutocompleteTrigger} from "@angular/material/autocomplete";
import {DiseasesFacade, setDisease} from "@ncats-frontend-library/stores/diseases";

@Component({
  selector: 'ncats-frontend-library-gard-search',
  templateUrl: './gard-search.component.html',
  styleUrls: ['./gard-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class GardSearchComponent implements OnInit {

  @ViewChild(MatAutocompleteTrigger, {static: true}) autocomplete: MatAutocompleteTrigger;
  /**
   * optional placeholder search string
   */
  @Input() placeholderStr?: string;

  @Input() disabled = false;
  options: any[] = [];

  /**
   * form control for text input
   * @type {FormControl}
   */
  typeaheadCtrl: FormControl;

  /**
   * observable list of returned responses
   */
  @Input() filteredGroups: [{name: string, options: any[]}];

  @Output() query: EventEmitter<any> = new EventEmitter<any>();
  @Output() inputChangeEvent: EventEmitter<string> = new EventEmitter<string>();

  searching = false;
  dataLoaded = false;
  serializer: DiseaseSerializer = new DiseaseSerializer();
  private driver;

  constructor(
    private changeRef: ChangeDetectorRef,
    private diseasesFacade: DiseasesFacade,
    private connectionService: Neo4jConnectService
  ) {}

  ngOnInit(): void {
    this.typeaheadCtrl = new FormControl({value: '', disabled: false});
    this.typeaheadCtrl.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged()
      )
      .subscribe(term => this.typeahead(term));
  }

  /**
   * emits query
   * @returns void
   */
  search(event?: MatAutocompleteSelectedEvent): void {
    const diseaseObj = this.typeaheadCtrl.value;
    this.diseasesFacade.dispatch(setDisease({id: diseaseObj.gard_id}));
  }

  displayFn(option: any): string {
    return option && option.name ? option.name : '';
  }

  checkOrigin(option: any): string {
    const val = this.typeaheadCtrl.value.name ? this.typeaheadCtrl.value.name : this.typeaheadCtrl.value;
    if(option.name.toLowerCase().includes(val.toLowerCase())) {
      return 'name';
    } else {
      return 'synonym';
    }
  }

  typeahead(event: any) {
    if(event.length > 0) {
      this.options = [];
      const call = `
      CALL db.index.fulltext.queryNodes("namesAndSynonyms", "name:${event}* OR ${event}*") YIELD node 
      with collect(properties(node)) AS arr 
      with arr[0..10] AS typeahead
      RETURN typeahead
      `;
     // console.log(call);
      this.connectionService.read('gard-data', call)
        .pipe(
          switchMap(res => {
            if(res.typeahead) {
              this.filteredGroups = [{name: 'GARD names', options: res.typeahead}];
              this.changeRef.markForCheck();
            }
              return of(res);
            }
          ),
        ).subscribe()
    } else {
    }
  }
}
