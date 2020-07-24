import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {FormControl} from "@angular/forms";
import {MatAutocompleteSelectedEvent, MatAutocompleteTrigger} from "@angular/material/autocomplete";
import {DiseasesFacade, searchDiseases, setDiseaseStats} from "@ncats-frontend-library/stores/diseases";
import {NavigationExtras, Router} from "@angular/router";
import {Neo4jConnectService} from "@ncats-frontend-library/shared/data-access/neo4j-connector";
import {DiseaseSerializer} from "@ncats-frontend-library/models/gard/gard-models";

/**
 * navigation options to merge query parameters that are added on in navigation/query/facets/pagination
 */
const navigationExtras: NavigationExtras = {
  queryParamsHandling: 'merge'
};

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
    private router: Router,
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

    this.diseasesFacade.searchDiseases$
      .pipe(
      switchMap(res => {
          if(res && res.typeahead) {
            this.filteredGroups = [{name: 'GARD names', options: res.typeahead}];
            this.changeRef.markForCheck();
          }
          return of(res);
        }
      ),
    ).subscribe()
  }

  /**
   * emits query
   * @returns void
   */
  search(event?: MatAutocompleteSelectedEvent): void {
    const diseaseObj = this.typeaheadCtrl.value;
    navigationExtras.queryParams = {
      disease: diseaseObj.gard_id
    };
    navigationExtras.replaceUrl = true;
    navigationExtras.queryParamsHandling = '';
      this.router.navigate(['/curation'], navigationExtras);
  //  this.query.emit(navigationExtras);
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
    if (event.length > 0) {
      this.options = [];
      this.diseasesFacade.dispatch(searchDiseases({query: event}));
    }
  }
}
