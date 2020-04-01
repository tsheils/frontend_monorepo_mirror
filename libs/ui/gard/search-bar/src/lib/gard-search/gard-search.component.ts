import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";
import {BehaviorSubject, Observable} from "rxjs";
import {Neo4jConnectService} from "@ncats-frontend-library/common/data-access/neo4j-connector";
import {DiseaseSerializer} from "../../../../../../../models/gard/disease";
import * as neo4j from "neo4j-driver";
import {fromPromise} from "rxjs/internal-compatibility";
import {FormControl} from "@angular/forms";
import {MatAutocompleteSelectedEvent, MatAutocompleteTrigger} from "@angular/material/autocomplete";
import {DiseasesFacade, loadDiseases, searchDiseases} from "@ncats-frontend-library/stores/diseases";

@Component({
  selector: 'ncats-frontend-library-gard-search',
  templateUrl: './gard-search.component.html',
  styleUrls: ['./gard-search.component.scss'],
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
    private diseasesFacade: DiseasesFacade,
    private connectionService: Neo4jConnectService
  ) {
    this.driver = neo4j.driver(
      'bolt://localhost:7687',
      neo4j.auth.basic('neo4j', 'tim')
    );
    fromPromise(this.driver.verifyConnectivity()
      .then((res) => {
        if (res) {
          //   this.writesession = this.writedriver.rxSession();
        }
      }));
  }

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
    this.autocomplete.closePanel();

    this.query.emit(this.typeaheadCtrl.value);
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
    this.options = [];
    if(event.length > 0) {
      this.diseasesFacade.dispatch(searchDiseases({query: event}));
      const call = `
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
      })
    }
  }
}
