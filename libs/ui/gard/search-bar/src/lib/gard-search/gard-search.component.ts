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
import {debounceTime, distinctUntilChanged, switchMap, zipAll} from "rxjs/operators";
import {BehaviorSubject, Observable} from "rxjs";
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
  options = [];

  /**
   * form control for text input
   * @type {FormControl}
   */
  typeaheadCtrl: FormControl;

  /**
   * observable list of returned responses
   */
  @Input() filteredGroups: any;



  @Output() query: EventEmitter<any> = new EventEmitter<any>();
  @Output() inputChangeEvent: EventEmitter<string> = new EventEmitter<string>();






  /**
   * subject to track neo4j session
   */
  private _typeaheadSource = new BehaviorSubject<any>(null);


  /**
   * Observable stream of session changes
   * @type {Observable<RxSession>}
   */
  typeaheadSource$: Observable<any> = this._typeaheadSource.asObservable();

  searching = false;
  dataLoaded = false;
  private diseaseObj: any[] = [];
  private disease: any;
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

    /*this.diseasesFacade.searchDiseases$.subscribe( {
      next: (res) => {
        console.log(res);
        this.options.push(res);
      },
      complete: () => {
      this.filteredGroups = [{name: 'GARD names', options: this.options}];
    }
    })*/
  }

  /**
   * emits query
   * @returns void
   */
  search(event?: MatAutocompleteSelectedEvent): void {
    console.log(this.typeaheadCtrl.value);
    const diseaseObj = this.typeaheadCtrl.value;
  this.diseasesFacade.dispatch(setDisease({disease: {
    id: diseaseObj.gard_id,
      name: diseaseObj.name,
      disease: diseaseObj
    }
  }));
    this.query.emit(this.typeaheadCtrl.value);
    this.autocomplete.closePanel();
  }

  displayFn(option: any): string {
    return option && option.name ? option.name : '';
  }

  getData(call: string): Observable<any> {
    const session = this.driver.rxSession();
    return session.readTransaction(txc => txc.run(call).records());
  }

  typeahead(event: any) {
    this.autocomplete.openPanel();
    if(event.length > 0) {
      this.options = [];
 /*     const call = `
      CALL db.index.fulltext.queryNodes("namesAndSynonyms", "name:${event} OR ${event}") YIELD node
      RETURN node LIMIT 10;
      `;*/
      const call = `
      CALL db.index.fulltext.queryNodes("namesAndSynonyms", "name:${event}* OR ${event}") YIELD node 
      with collect(properties(node)) AS arr 
      with arr[0..10] AS data
      RETURN data
      `;
      this.connectionService.read('gard-data', call)
        .pipe(
          switchMap(res => {
            this.filteredGroups = [{name: 'GARD names', options: res.toObject().data}];
            this.changeRef.markForCheck();
              return res;
            }
          ),
        ).subscribe( )
          //{
       /* next: (res => {console.log(res)}),
        complete: () => {
          this.filteredGroups = [{name: 'GARD names', options: this.options}];
          this.changeRef.markForCheck();
        }*/
     // })
     // this.diseasesFacade.dispatch(searchDiseases({query: event}));
/*      const call = `
      CALL db.index.fulltext.queryNodes("namesAndSynonyms", "name:${event} OR ${event}") YIELD node
      RETURN node LIMIT 10;
      `;
      this.getData(call)
        .pipe(
          switchMap(res => {
              this.options.push(res.toObject().node.properties);
              return res;
            }
          )
        ).subscribe( {
        complete: () => {
          this.filteredGroups = [{name: 'GARD names', options: this.options}];
          console.log(this.filteredGroups);
        }
      })*/
    }
  }
}